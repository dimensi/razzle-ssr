import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import Helmet from 'react-helmet'
import { matchPath, StaticRouter } from 'react-router-dom'

import { Document as DefaultDoc } from './Document'
import { After } from './After'
import { loadInitialProps } from './loadInitialProps'

const modPageFn = function (Page) {
  return (props) => <Page {...props} />
}

/*
 The customRenderer parameter is a (potentially async) function that can be set to return
 more than just a rendered string.
 If present, it will be used instead of the default ReactDOMServer renderToString function.
 It has to return an object of shape { html, ... }, in which html will be used as the rendered string
 Other props will be also pass to the Document component
  */

export async function render (options) {
  const { req, res, routes, assets, document: Document, customRenderer, ...rest } = options
  const Doc = Document || DefaultDoc

  const context = {}
  const renderPage = async (fn = modPageFn) => {
    // By default, we keep ReactDOMServer synchronous renderToString function
    const defaultRenderer = (element) => ({ html: ReactDOMServer.renderToString(element) })
    const renderer = customRenderer || defaultRenderer
    const asyncOrSyncRender = renderer(
      <StaticRouter location={req.url} context={context}>
        {fn(After)({ routes, data })}
      </StaticRouter>
    )

    const renderedContent = await asyncOrSyncRender
    const helmet = Helmet.renderStatic()

    return { helmet, ...renderedContent }
  }

  const { match, data } = await loadInitialProps(routes, req.path, {
    req,
    res,
    ...rest,
  })

  if (!match) {
    res.status(404)
    return
  }

  if (match.path === '**') {
    res.status(404)
  } else if (match && match.redirectTo && match.path) {
    res.redirect(301, req.originalUrl.replace(match.path, match.redirectTo))
    return
  }

  const reactRouterMatch = matchPath(req.url, match)

  const { html, ...docProps } = await Doc.getInitialProps({
    req,
    res,
    assets,
    renderPage,
    data,
    helmet: Helmet.renderStatic(),
    match: reactRouterMatch,
    ...rest,
  })

  const doc = ReactDOMServer.renderToStaticMarkup(<Doc {...docProps} />)
  return `<!doctype html>${doc.replace('DO_NOT_DELETE_THIS_YOU_WILL_BREAK_YOUR_APP', html)}`
}
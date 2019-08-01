import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import Helmet from 'react-helmet'
import { matchPath, StaticRouter } from 'react-router-dom'
import path from 'path'
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'

import { Document } from './Document'
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
  const { req, res, routes, ...rest } = options

  const extractor = new ChunkExtractor({
    statsFile: path.resolve('build/loadable-stats.json'),
    entrypoints: ['client'],
  })

  const context = {}
  const renderPage = async (fn = modPageFn) => {
    const renderer = (element) => ({ html: ReactDOMServer.renderToString(element) })
    const asyncOrSyncRender = renderer(
      <ChunkExtractorManager extractor={extractor}>
        <StaticRouter location={req.url} context={context}>
          {fn(After)({ routes, data })}
        </StaticRouter>
      </ChunkExtractorManager>
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

  const { html, ...docProps } = await Document.getInitialProps({
    req,
    res,
    renderPage,
    data,
    helmet: Helmet.renderStatic(),
    match: reactRouterMatch,
    ...rest,
  })

  const doc = ReactDOMServer.renderToStaticMarkup(<Document {...docProps} extractor={extractor} />)
  return `<!doctype html>${doc.replace('DO_NOT_DELETE_THIS_YOU_WILL_BREAK_YOUR_APP', html)}`
}

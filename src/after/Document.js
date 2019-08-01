import * as React from 'react'
import serialize from 'serialize-javascript'

export class Document extends React.Component {
  static async getInitialProps ({ assets, data, renderPage }) {
    const page = await renderPage()

    return { assets, data, ...page }
  }

  render () {
    const { helmet, data, extractor } = this.props
    // get attributes from React Helmet
    const htmlAttrs = helmet.htmlAttributes.toComponent()
    const bodyAttrs = helmet.bodyAttributes.toComponent()

    return (
      <html {...htmlAttrs}>
        <head>
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta charSet='utf-8' />
          <title>Welcome to the Afterparty</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {extractor.getLinkElements().map(el => (
            React.cloneElement(el, {
              crossOrigin: '',
            })
          ))}
          {extractor.getStyleElements()}
        </head>
        <body {...bodyAttrs}>
          <AfterRoot />
          <AfterData data={data} />
          {extractor.getScriptElements().map(el => (
            React.cloneElement(el, {
              crossOrigin: '',
            })
          ))}
        </body>
      </html>
    )
  }
}

export function AfterRoot () {
  return <div id='root'>DO_NOT_DELETE_THIS_YOU_WILL_BREAK_YOUR_APP</div>
}

export function AfterData ({ data }) {
  return (
    <script
      id='server-app-state'
      type='application/json'
      dangerouslySetInnerHTML={{
        __html: serialize({ ...data }),
      }}
    />
  )
}

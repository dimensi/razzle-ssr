import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { loadableReady } from '@loadable/component'

import { ensureReady, After } from 'src/after'

import './Home.css'
import routes from './routes'

loadableReady(
  () =>
    ensureReady(routes).then(data =>
      hydrate(
        <BrowserRouter>
          <After data={data} routes={routes} />
        </BrowserRouter>,
        document.getElementById('root')
      )
    )
)

if (module.hot) {
  module.hot.accept()
}

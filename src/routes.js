import loadable from '@loadable/component'

import { Error } from './Error'

export default [
  {
    path: '/',
    exact: true,
    component: loadable(() => import('./Home')),
  },
  {
    path: '/about',
    exact: true,
    component: loadable(() => import('./About')),
  },
  {
    component: Error,
  },
]

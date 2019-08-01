import Loadable from 'react-loadable'

import { Error } from './Error'

export default [
  {
    path: '/',
    exact: true,
    component: Loadable({
      loader: () => import('./Home'),
    }),
  },
  {
    path: '/about',
    exact: true,
    component: Loadable({
      loader: () => import('./About'), // required
    }),
  },
  {
    component: Error,
  },
]

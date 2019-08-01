import {
  isAsyncComponent,
  findMatchedRoute,
  loadRouteComponent,
} from './utils'

export async function loadInitialProps (routes, pathname, ctx) {
  const { match, route } = findMatchedRoute(routes, pathname)
  const matchedComponent = (route && route.component) || undefined
  if (route) {
    await loadRouteComponent(route)
  }
  const initialPropsData =
    matchedComponent && match && isAsyncComponent(matchedComponent)
      ? await matchedComponent.getInitialProps({ match, ...ctx })
      : undefined

  return {
    match: matchedComponent,
    data: initialPropsData,
  }
}

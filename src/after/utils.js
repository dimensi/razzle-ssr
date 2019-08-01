import { matchPath } from 'react-router-dom'

/** @private is the given object a Function? */
export const isFunction = (obj) => typeof obj === 'function'

/** @private is the given object an Object? */
export const isObject = (obj) => obj !== null && typeof obj === 'object'

/** @private Guard cluase to narrow the AsyncRouteableComponent union type on getInitialProps */
export function isAsyncComponent (Component) {
  return Component.getInitialProps !== undefined
}

/** @private Guard cluase to narrow the AsyncRouteableComponent union type on load */
export function isLoadableComponent (Component) {
  return Component.load !== undefined
}

/** @public Find route similar to how RR Switch does */
export function findMatchedRoute (
  routes,
  pathname,
) {
  const matchedRoute = routes.find(
    (route) => !!route.hasOwnProperty('path') && !!matchPath(pathname, route)
  ) || routes.find(
    // if no route is found, attempt to find a fallback (not-found) route
    (route) => !route.hasOwnProperty('path')
  )
  // if this is the fallback (not-found) route, `matchPath` errors out if there is no `path`, so we use "*"
  const match = (matchedRoute && matchPath(pathname, matchedRoute.hasOwnProperty('path') ? matchedRoute : { path: '**' })) || undefined

  return {
    match,
    route: matchedRoute,
  }
}

/** @public Return promise of loading component if it is an `isLoadableComponent` */
export function loadRouteComponent (
  route,
) {
  if (route.component && isLoadableComponent(route.component)) {
    return route.component.load()
  } else {
    return Promise.resolve(route.component || null)
  }
}

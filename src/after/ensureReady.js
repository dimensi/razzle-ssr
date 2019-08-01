import { findMatchedRoute, loadRouteComponent } from './utils'

/**
 * This helps us to make sure all the async code is loaded before rendering.
 */
export async function ensureReady (routes, pathname) {
  const { route } = findMatchedRoute(routes, pathname || window.location.pathname)
  if (route) {
    await loadRouteComponent(route)
  }
  let data = {}
  if (typeof window !== 'undefined' && !!document) {
    // deserialize state from 'serialize-javascript' format
    // eslint-disable-next-line no-eval
    data = eval(`(${document.getElementById('server-app-state').textContent})`)
  }
  return Promise.resolve(data)
}

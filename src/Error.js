import React from 'react'
import { Link } from 'react-router-dom'

export function Error ({ location }) {
  return (<div>Page not found 404: {location.pathname} <br /> Go back <Link to='/'>to home</Link></div>)
}

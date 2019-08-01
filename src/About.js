import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Axios from 'axios'

function About ({ stuff, todo }) {
  return stuff ? (
    <div>
      <Helmet>
        <title>About</title>
      </Helmet>
      about <Link to='/'>Home</Link>
      {JSON.stringify(todo)}
    </div>
  ) : null
}

About.getInitialProps = async function ({ req, res, match, history, location, ...ctx }) {
  const data = await Axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.data)
  return { stuff: 'more stuffs', todo: data }
}

export default About

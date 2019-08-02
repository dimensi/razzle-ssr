import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Axios from 'axios'

class About extends React.Component {
  static async getInitialProps ({ req, res, match, history, location, ...ctx }) {
    const data = await Axios.get('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.data)
    return { stuff: 'more stuffs', todo: data }
  }

  render () {
    const { stuff, todo } = this.props
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
}

export default About

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import logo from './react.svg'
import './App.css'
import './Home.css'

class Home extends Component {
  static async getInitialProps ({ req, res, match, history, location, ...ctx }) {
    return { stuff: 'whatevs' }
  }

  render () {
    return (
      <div className='Home'>
        <Helmet titleTemplate='SSR TEST - %s'>
          <title>Home</title>
        </Helmet>
        <div className='Home-header'>
          <img src={logo} className='Home-logo' alt='logo' />
          <h2>Welcome to After.js</h2>
        </div>
        <p className='Home-intro'>
          To get started, edit
          <code>src/Home.js</code> or <code>src/About.js</code>and save to
          reload.
        </p>
        <p>
          {this.props.stuff}
        </p>
        <Link to='about'>About -></Link>
        <Link to='notfound'>Error page</Link>
      </div>
    )
  }
}

export default Home

import React, {Component} from 'react'
import {Link} from 'react-router'

class SomethingWentWrong extends Component {
  render() {
    return (
      <article className="page">
        <header>
          <h2>Something went wrong</h2>
          <p>Unexpected application state.</p>
        </header>
        <section className="page-content">
          <h3>Application has cought an error</h3>
          <p>The page you were trying to view has received an error.</p>
          <p>You may start your browsing from <Link to="/">Home</Link>.</p>
        </section>
      </article>
    )
  }
}

export default SomethingWentWrong

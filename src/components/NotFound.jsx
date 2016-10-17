import React, {Component} from 'react'

class NotFound extends Component {
  render() {
    return (
      <article className="page">
        <header>
          <h2>404 Not Found</h2>
          <p>The resource yoy were looking for is not found.</p>
        </header>
        <section className="page-content">
          <h1>404 Not Found</h1>
        </section>
      </article>
    )
  }
}

export default NotFound

import React, {Component} from 'react'
import RecentPosts from './WP/RecentPosts'
class Home extends Component {

  render() {
    return (
      <article className="page">
        <header>
          <h2>Welcome to WP API client</h2>
          <p>Latest posts and categories are here.</p>
        </header>
        <section className="page-content">
          <RecentPosts />
        </section>
      </article>
    )
  }
}

export default Home

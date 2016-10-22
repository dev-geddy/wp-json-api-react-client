import React, {Component} from 'react'
import _get from 'lodash/get'
import {Link} from 'react-router'
import './PostItem.scss'

class PostItem extends Component {

  render() {
    const {
      post
    } = this.props

    const thumbnailSrc = _get(post, 'thumbnail') || false

    return (
      <article className="wp-post-item">
        <header>
          <h3><Link to={'/post/' + _get(post, 'slug')} title={_get(post, 'title')} rel={_get(post, 'url')}>{_get(post, 'title')}</Link></h3>
          <small>Post appears in <Link to={'/category/' + _get(post, 'categories[0].slug')}>{_get(post, 'categories[0].title')}</Link>.</small>
          <div className="wp-thumb-paceholder">{thumbnailSrc && <img src={thumbnailSrc} alt="ALT" />}</div>
        </header>
        <section className="wp-recent-post-content">
          <div dangerouslySetInnerHTML={{__html: _get(post, 'excerpt')}} />
          <Link to={'/post/' + _get(post, 'slug')} title={_get(post, 'title')} rel={_get(post, 'url')}>Read more...</Link>
        </section>
        <footer>
          <small>By <strong>{_get(post, 'author.name')}</strong> at <em>{_get(post, 'date')}</em></small>
        </footer>
      </article>
    )
  }
}

export default PostItem

import React, {Component} from 'react'
import PostItem from './../partials/PostItem'

class PostsList extends Component {
  _renderPosts(posts) {
    return posts.map((post, index)=>{
      return (
        <div key={index} className="column small-12 medium-6 large-4" style={{marginTop: 30}}>
          <PostItem post={post} />
        </div>
      )
    })
  }

  render() {
    const {
      posts
    } = this.props

    return (
      <div className="row">{posts && this._renderPosts(posts)}</div>
    )
  }
}

export default PostsList

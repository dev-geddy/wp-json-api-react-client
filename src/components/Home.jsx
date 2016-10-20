import React, {Component} from 'react'
import WpStore from '../stores/WpStore'
import AppDispatcher from '../dispatchers/AppDispatcher'
// import {Link} from 'react-router'
import RecentPost from './WP/partials/RecentPost'
import Loader from './UI/Loader/Loader'
import WP from '../modules/wp/config'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      isLoading: false,
      recentPosts: {}
    }
  }

  _onStoreChange() {
    this.setState({
      ...WpStore.state
    })
  }

  componentWillMount() {
    this._changeListener = this._onStoreChange.bind(this)
    WpStore.addChangeListener(this._changeListener)
    AppDispatcher.dispatch({actionType: WP.GET_RECENT_POSTS.DEFAULT})
  }


  componentWillUnmount() {
    WpStore.removeChangeListener(this._changeListener)
    this._changeListener = null
  }

  _renderPosts(posts) {
    return posts.map((post, index)=>{
      return (
        <div key={index} className="column small-12 medium-6 large-4" style={{marginTop: 30}}>
          <RecentPost post={post} />
        </div>
      )
    })
  }

  render() {
    const {
      isLoading,
      error,
      data
      } = this.state

    return (
      <article className="page">
        <header>
          <h2>Welcome to WP API client</h2>
          <p>Latest posts and categories are here.</p>
        </header>
        <section className="page-content">
          {isLoading && isLoading.recentPosts ?
            <Loader text="Loading recent posts..." />
            :<div className="row">{data.recentPosts.count && this._renderPosts(data.recentPosts.posts)}</div>}

        </section>
      </article>
    )
  }
}

export default Home

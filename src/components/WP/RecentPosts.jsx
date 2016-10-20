import React, {Component} from 'react'
import WpStore from '../../stores/WpStore'
import AppDispatcher from '../../dispatchers/AppDispatcher'
import RecentPost from './partials/RecentPost'
import Loader from './../UI/Loader/Loader'
import WP from '../../modules/wp/config'

class RecentPosts extends Component {
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
      ...WpStore.stateOf('recentPosts')
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
      <div>
        {error && <p>{error}</p>}
        {isLoading ?
          <Loader text="Loading recent posts..." />
          :<div className="row">{data.count && this._renderPosts(data.posts)}</div>}
      </div>
    )
  }
}

export default RecentPosts

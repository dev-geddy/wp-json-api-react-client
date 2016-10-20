import React, {Component} from 'react'
import WpStore from '../stores/WpStore'
import AppDispatcher from '../dispatchers/AppDispatcher'
import Loader from './UI/Loader/Loader'
import WP from '../modules/wp/config'
import Post from './WP/Post'
import _get from 'lodash/get'

class PostView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      isLoading: false,
      post: {}
    }
  }

  _onStoreChange() {
    this.setState({
      ...WpStore.stateOf('post')
    })
  }

  componentWillMount() {
    this._changeListener = this._onStoreChange.bind(this)
    WpStore.addChangeListener(this._changeListener)
    AppDispatcher.dispatch({actionType: WP.GET_POST.DEFAULT, postSlug: this.props.params.postSlug})
  }


  componentWillUnmount() {
    WpStore.removeChangeListener(this._changeListener)
    this._changeListener = null
  }
  render() {
    const {
      isLoading,
      error,
      data
    } = this.state
    console.log(data)
    return (
      <article className="page">
        <header>
          <h2>{_get(data,'post.title')}</h2>
          <p dangerouslySetInnerHTML={{__html: _get(data,'post.excerpt')}} />
        </header>
        <section className="page-content">
          {error && <p>{error}</p>}
          {isLoading ?
            <Loader text="Loading recent posts..." />
            :
            <div className="wp-post-content">
              <img src={ _get(data,'post.thumbnail')} alt="ALT" style={{maxWidth:500, height:'auto'}} />
              <div dangerouslySetInnerHTML={{__html: _get(data,'post.content')}} />
              <p><small>By <strong>{_get(data, 'post.author.name')}</strong> at <em>{_get(data, 'post.date')}</em></small></p>
            </div>}
        </section>
      </article>
    )
  }
}

export default PostView

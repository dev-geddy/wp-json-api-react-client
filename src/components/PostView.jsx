import React, {Component} from 'react'
import WpStore from '../stores/WpStore'
import AppDispatcher from '../dispatchers/AppDispatcher'
import Loader from './UI/Loader/Loader'
import WP_EVENTS from '../modules/wp/config'
// import Post from './WP/Post'
import BreadCrumbs from './WP/partials/BreadCrumbs'
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
    AppDispatcher.dispatch({actionType: WP_EVENTS.GET_POST.DEFAULT, postSlug: this.props.params.postSlug})
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

    const hasThumbnail = _get(data,'post.thumbnail', false)

    return (
      <article className="page">
        <header>
          <h2 dangerouslySetInnerHTML={_get(data,'post.title', 'Post about...')} />
          <p dangerouslySetInnerHTML={{__html: _get(data,'post.excerpt')}} currentCategory={_get(data,'post.categories[0]', {})} />
        </header>
        <section className="page-content">
          <BreadCrumbs currentName={_get(data,'post.title')} categorySlug={_get(data,'post.category[0].slug')} />
          {error && <p>{error}</p>}
          {isLoading ?
            <Loader text="Loading posts..." />
            :
            <div className="wp-post-content">
              {hasThumbnail && <img src={hasThumbnail} alt="ALT" style={{maxWidth: 500, width: '100%', height:'auto'}} />}
              <div dangerouslySetInnerHTML={{__html: _get(data,'post.content')}} />
              <p><small>By <strong>{_get(data, 'post.author.name')}</strong> at <em>{_get(data, 'post.date')}</em></small></p>
            </div>}
        </section>
      </article>
    )
  }
}

export default PostView

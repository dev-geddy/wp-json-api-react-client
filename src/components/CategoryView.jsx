import React, {Component} from 'react'
import WpStore from '../stores/WpStore'
import AppDispatcher from '../dispatchers/AppDispatcher'
import Loader from './UI/Loader/Loader'
import WP_EVENTS from '../modules/wp/config'
import PostsList from './WP/lists/PostsList'
import BreadCrumbs from './WP/partials/BreadCrumbs'
import _get from 'lodash/get'

class CategoryView extends Component {
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
      ...WpStore.stateOf('categoryPosts')
    })
  }

  componentWillMount() {
    this._changeListener = this._onStoreChange.bind(this)
    WpStore.addChangeListener(this._changeListener)
    AppDispatcher.dispatch({
      actionType: WP_EVENTS.GET_CATEGORY_POSTS.DEFAULT,
      categorySlug: this.props.params.categorySlug
    })
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
          <h2>{_get(data,'category.title')}</h2>
          <BreadCrumbs currentName={_get(data,'category.title')} currentCategory={_get(data,'category', {})} inCategory={true} />
        </header>
        <section className="page-content">
          {error ? <p>{error}</p> : <div>
            {isLoading ?
              <Loader text="Loading posts..." />
              :
              <div><PostsList posts={data.posts} /></div>}
          </div>}
        </section>
      </article>
    )
  }
}

export default CategoryView

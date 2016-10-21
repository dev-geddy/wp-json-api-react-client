import React, {Component} from 'react'
import WpStore from '../../../stores/WpStore'
import AppDispatcher from '../../../dispatchers/AppDispatcher'
import {Link} from 'react-router'
import WP_EVENTS from '../../../modules/wp/config'
import './BreadCrumbs.scss'
import _get from 'lodash/get'

export class BreadCrumbs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categorySlug: '',
      isLoading: false,
      breadcrumbs: null
    }
  }

  _onStoreChange() {
    this.setState({
      ...WpStore.stateOf('categoryIndex')
    })
    console.log("categoryIndex: ",WpStore.stateOf('categoryIndex'))
  }

  componentWillMount() {
    this._changeListener = this._onStoreChange.bind(this)
    WpStore.addChangeListener(this._changeListener)
    AppDispatcher.dispatch({actionType: WP_EVENTS.GET_CATEGORY_INDEX.DEFAULT})
  }


  componentWillUnmount() {
    WpStore.removeChangeListener(this._changeListener)
    this._changeListener = null
  }

  findCategoryById(id, categories) {
    let myCategory = {}

    if (!categories) return false

    categories.map((category)=> {
      if (category.id === id) {
        myCategory = category
      }
    })
    return myCategory
  }

  findParentCategoryById(id, categories) {
    let myCategory = {}
    categories.map((category)=> {
      if (category.id === id) {
        myCategory = category
      }
    })
    console.log("findParentCategoryById::myCategory", myCategory)
    return myCategory
  }

  buildBreadCrumbs(categories, currentCategory) {
    let breadcrumbs = []
    let homeCrumb = {
      description: "",
      id: -1,
      parent: -1,
      post_count: -1,
      slug: "",
      title: "Home"
    }

    const categoryId = _get(currentCategory,'id',0)

    let breadcrumb = this.findCategoryById(categoryId, categories)
    if (breadcrumb) {
      breadcrumbs.push(breadcrumb)
      while (breadcrumb.parent > 0) {
        breadcrumb = this.findParentCategoryById(breadcrumb.parent, categories)
        if (breadcrumb) {
          breadcrumbs.unshift(breadcrumb)
        }
      }
    }
    breadcrumbs.unshift(homeCrumb)
    return breadcrumbs
  }

  renderBreadCrumbs(currentCategory, currentName, categories) {
    const breadcrumbs = (currentCategory && categories) ? this.buildBreadCrumbs(categories, currentCategory) : []
    let breadcrumbNodes = breadcrumbs.map((breadcrumb, index)=> {
      if (breadcrumb.title) {
        return (
          <li key={index}>{breadcrumb.slug ? <i className="material-icons">keyboard_arrow_right</i> : ''}
            <Link to={breadcrumb.slug ? '/category/' + breadcrumb.slug : '/'} alt={breadcrumb.title}>
              {breadcrumb.title}
            </Link>
          </li>
        )
      }
    })
    if (currentName) {
      breadcrumbNodes.push(<li key="99999">
        <i className="material-icons">keyboard_arrow_right</i>
        <span>{currentName}</span>
      </li>)
    }
    return breadcrumbNodes
  }

  render() {
    const {
      currentName,
      currentCategory
    } = this.props

    const {
      isLoading,
      data,
      error
      } = this.state

    const categories = _get(data, 'categories')

    return (
      <div className="breadcrumbs">
        {error && <p>{error}</p>}
        <ul>{isLoading ? <li>Loading...</li> : this.renderBreadCrumbs(currentCategory, currentName, categories)}</ul>
      </div>
    )
  }
}

export default BreadCrumbs
import React, {Component} from 'react'
import WpStore from '../../../stores/WpStore'
import AppDispatcher from '../../../dispatchers/AppDispatcher'
import {Link} from 'react-router'
import WP_EVENTS from '../../../modules/wp/config'
import './BreadCrumbs.scss'

export class BreadCrumbs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categorySlug: '',
      categoryId: '',
      postId: '',
      isLoading: false,
      breadcrumbs: null
    }
  }

  componentWillReceiveProps(nextProps) {
    this.state.categorySlug = nextProps.categorySlug
    this.buildBreadCrumbs()
  }

  _onStoreChange() {
    this.setState({
      ...WpStore.stateOf('categoryIndex')
    })
    // this.buildBreadcrumb.... => new state should build breadcrumbs in render method
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

  findCategoryBySlug(slug) {
    let myCategory = {}
    const {
      categoryIndex
      } = this.state

    if (!categoryIndex) return false
    categoryIndex.map((category)=> {
      if (category.slug == slug) {
        myCategory = category
      }
    })
    return myCategory
  }

  findParentCategoryById(id) {
    let myCategory = {}
    const {
      categoryIndex
      } = this.state

    categoryIndex.map((category)=> {
      if (category.id == id) {
        myCategory = category
      }
    })
    return myCategory
  }

  buildBreadCrumbs() {
    let breadcrumbs = []
    let homeCrumb = {
      description: "",
      id: -1,
      parent: -1,
      post_count: -1,
      slug: "",
      title: "Home"
    }

    const {
      categorySlug
      } = this.props

    let breadcrumb = this.findCategoryBySlug(categorySlug)
    if (breadcrumb) {
      breadcrumbs.push(breadcrumb)
      while (breadcrumb.parent > 0) {
        breadcrumb = this.findParentCategoryById(breadcrumb.parent)
        if (breadcrumb) {
          breadcrumbs.unshift(breadcrumb)
        }
      }
    }
    breadcrumbs.unshift(homeCrumb)
    return breadcrumbs
  }

  renderBreadCrumbs(categoryIndex) {
    const {
      currentName
      } = this.props

    let breadcrumbs = this.buildBreadCrumbs()

    if (!breadcrumbs || !breadcrumbs.length) return <li>&nbsp;</li>
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
        <i className="material-icons">keyboard_arrow_right</i><span
        dangerouslySetInnerHTML={{__html: currentName}}></span>
      </li>)
    }
    return breadcrumbNodes
  }

  render() {
    const {
      isLoading,
      categoryIndex,
      error
      } = this.state
    return (
      <div className="breadcrumbs">
        {error && <p>{error}</p>}
        <ul>{isLoading ? <li>&nbsp;</li> : this.renderBreadCrumbs(categoryIndex)}</ul>
      </div>
    )
  }
}

export default BreadCrumbs
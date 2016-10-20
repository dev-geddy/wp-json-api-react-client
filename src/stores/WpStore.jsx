import {EventEmitter} from 'events'
import Request from '../services/Request'
import AppDispatcher from '../dispatchers/AppDispatcher'
// import WpService from '../services/WpService'

const BASE_URL = 'http://api.include.lt/api'

import WP_EVENT from '../modules/wp/config'

export class WpStore extends EventEmitter {

  constructor() {
    super()
    this.subscribe(() => this._registerToActions.bind(this))
    this.appState = {
      error: {
        recentPosts: '',
        categoryPosts: '',
        categoryIndex: '',
        post: '',
        page: '',
      },
      isLoading: {
        recentPosts: false,
        categoryPosts: false,
        categoryIndex: false,
        post: false,
        page: false,

      },
      data: {
        recentPosts: [],
        categoryPosts: [],
        categoryIndex: [],
        post: [],
        page: []
      },
      recentPosts: {}
    }
    // this.service = this.service ? this.service : new WpService(this.onData)
  }

  /*onData(data) {
   console.log("onData: ", data)
   }*/

  subscribe(actionSubscribe) {
    this._dispatchToken = AppDispatcher.register(actionSubscribe())
  }

  get dispatchToken() {
    return this._dispatchToken
  }

  emitChange() {
    this.emit('CHANGE')
  }

  addChangeListener(callback) {
    this.on('CHANGE', callback)
  }

  removeChangeListener(callback) {
    this.removeListener('CHANGE', callback)
  }

  _registerToActions(action) {
    switch (action.actionType) {
      case WP_EVENT.GET_RECENT_POSTS.DEFAULT:
        this._fetchRecentPosts()
        break
      case WP_EVENT.GET_CATEGORY_INDEX.DEFAULT:
        this._fetchCategoryIndex()
        break
      case WP_EVENT.GET_POST.DEFAULT:
        this._fetchPost(action.postSlug)
        break
      case WP_EVENT.GET_PAGE.DEFAULT:
        this._fetchPost(action.pageSlug)
        break
      case WP_EVENT.GET_CATEGORY_POSTS.DEFAULT:
        this._fetchCategoryPosts(action.categorySlug)
        break
      default:
        break
    }
  }

  _emitError(dataKey, error) {
    let newState = {
      ...this.appState
    }
    newState.error[dataKey] = error
    newState.data[dataKey] = []
    newState.isLoading[dataKey] = false
    this.appState = newState
    this.emitChange()
  }

  _emitData(dataKey, data) {
    let newState = {
      ...this.appState
    }
    newState.error[dataKey] = ''
    newState.data[dataKey] = data || []
    newState.isLoading[dataKey] = false
    this.appState = newState
    this.emitChange()
  }

  _emitLoading(dataKey, isLoading) {
    let newState = {
      ...this.appState
    }
    newState.error[dataKey] = ''
    newState.data[dataKey] = []
    newState.isLoading[dataKey] = isLoading
    this.appState = newState
    this.emitChange()
  }

  _fetchRecentPosts() {
    this.callWpApi('GET', '/get_recent_posts/', 'recentPosts')
  }

  _fetchPost(postSlug) {
    this.callWpApi('GET', '/get_post/?slug=' + postSlug, 'post')
  }

  _fetchCategoryIndex() {
    this.callWpApi('GET', '/get_category_index/', 'categoryIndex')
  }

  _fetchCategoryPosts(categorySlug) {
    this.callWpApi('GET', '/get_category_posts/?slug=' + categorySlug, 'categoryPosts')
  }

  _fetchPage(pageSlug) {
    this.callWpApi('GET', '/get_page/' + pageSlug, 'page')
  }

  callWpApi(METHOD, URL, dataKey) {
    this._emitLoading(dataKey, true)
    Request.callEndpoint({
      method: METHOD,
      url: BASE_URL + URL
    }).then((res)=> {
      let apiData = res.data
      this._emitData(dataKey, apiData)
    }, error => {
      this._emitError(dataKey, error)
    }).catch(error => {
      this._emitError(dataKey, error)
    })
  }

  get state() {
    return this.appState
  }

  stateOf(dataKey) {
    return {
      isLoading: this.appState.isLoading[dataKey],
      data: this.appState.data[dataKey],
      error: this.appState.error[dataKey]
    }
  }
}

export default new WpStore()
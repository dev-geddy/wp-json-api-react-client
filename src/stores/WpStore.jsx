import {EventEmitter} from 'events'
import Request from '../services/Request'
import AppDispatcher from '../dispatchers/AppDispatcher'
// const BASE_URL = 'http://localhost:3601'
const BASE_URL = 'http://api.include.lt/api'

export const WP = {
  GET_RECENT_POSTS: 'WP/GET_RECENT_POSTS'
}

export class WpStore extends EventEmitter {

  constructor() {
    super()
    this.subscribe(() => this._registerToActions.bind(this))
    this.appState = {
      error: '',
      isLoading: {
        recentPosts: false
      },
      recentPosts: {}
    }
    /*this.defaultCssState = {
     error: '',
     isLoading: false,
     cssSourceCode: ''
     }*/
  }

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
      case 'WP/GET_RECENT_POSTS':
        this._getRecentPosts()
        break
      default:
        break
    }
  }

  _emitError(e) {
    this.appState = {
      isLoading: {
        recentPosts: false
      },
      recentPosts: {},
      error: e.message
    }
    this.emitChange()
  }

  _emitData(data) {
    this.appState = {
      isLoading: {
        recentPosts: false
      },
      recentPosts: data,
      error: ''
    }
    this.emitChange()
  }

  _getRecentPosts() {

    this.appState = {
      isLoading: {
        recentPosts: true
      },
      recentPosts: '',
      error: ''
    }
    this.emitChange()

    Request.callEndpoint({
      method: 'GET',
      url: BASE_URL + '/get_recent_posts/'
    }).then((res)=> {
      let apiData = res.data
      this._emitData(apiData)
    }, error => {
      this._emitError(error)
    }).catch(error => {
      this._emitError(error)
    })
  }

  get state() {
    return this.appState
  }
}

export default new WpStore()
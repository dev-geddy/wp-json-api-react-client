import {EventEmitter} from 'events'
import Request from '../services/Request'
import AppDispatcher from '../dispatchers/AppDispatcher'

// const BASE_URL = 'http://localhost:3601'
const BASE_URL = 'http://www.include.lt'

export class AppStore extends EventEmitter {

  constructor() {
    super()
    this.subscribe(() => this._registerToActions.bind(this))
    this.appState = {
      error: '',
      isLoading: false,
      cssSourceCode: ''
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
      case 'GET_CSS_SOURCE':
        this._getCssSource(action.cssFile)
        break
      default:
        break
    }
  }

  _emitError(e, cssFileName) {
    this.appState[cssFileName] = {
      isLoading: false,
      cssSourceCode: '',
      error: e.message
    }
    this.emitChange()
  }

  _emitData(data, cssFileName) {
    this.appState[cssFileName] = {
      isLoading: false,
      cssSourceCode: data,
      error: ''
    }
    this.emitChange()
  }

  _getCssSource(cssFileName) {

    this.appState[cssFileName] = {
      error: '',
      cssSourceCode: '',
      isLoading: true
    }
    this.emitChange()

    Request.callEndpoint({
      method: 'GET',
      url: BASE_URL + '/get-css-source/' + cssFileName
    }).then((res)=> {
      let apiData = res.data.data.css
      this._emitData(apiData, cssFileName)
    }, error => {
      this._emitError(error, cssFileName)
    }).catch(error => {
      this._emitError(error, cssFileName)
    })
  }

  getCssState(cssFileName) {
    if (!this.appState[cssFileName]) {
      this.appState[cssFileName] = {
        isLoading: false,
        cssSourceCode: '',
        error: ''
      }
    }
    return this.appState[cssFileName]
  }

  get state() {
    return this.appState
  }
}

export default new AppStore()
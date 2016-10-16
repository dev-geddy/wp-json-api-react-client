import React, {Component} from 'react'
import AppStore from '../stores/AppStore'
// import AppDispatcher from '../dispatchers/AppDispatcher'
import {Link} from 'react-router'


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      isLoading: false
    }
  }

  _onStoreChange() {
    this.setState({
      ...AppStore.state
    })
  }

  componentWillMount() {
    this._changeListener = this._onStoreChange.bind(this)
    AppStore.addChangeListener(this._changeListener)
  }


  componentWillUnmount() {
    AppStore.removeChangeListener(this._changeListener)
    this._changeListener = null
  }


  render() {

    return (
      <article className="page">
        <header>
          <h2>Welcome to WP API client</h2>
          <p>Latest posts and categories are here.</p>
        </header>
        <section className="page-content">
          Content area...
        </section>
      </article>
    )
  }
}

export default Home

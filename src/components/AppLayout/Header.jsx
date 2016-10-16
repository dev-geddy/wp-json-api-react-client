import React, {Component} from 'react'

class Header extends Component {
  render() {
    return (
      <header id="appHeader">
        <div className="logo">
          <i className="material-icons">library_books</i>
          <div className="great-title">
            <strong>React WP API Client</strong>
            <small>React/ES6/WP/API</small>
          </div>
        </div>
      </header>
    )
  }
}

export default Header

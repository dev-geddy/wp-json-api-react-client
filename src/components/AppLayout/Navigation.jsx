import React, {Component} from 'react'
import {Link} from 'react-router'

class Navigation extends Component {
  render() {
    const {
      activeLocation,
      onNavigation
      } = this.props
    return (
      <div className="app-navigation">
        <Link className={activeLocation === '/' ? 'current' : 'home'} to="/" onClick={onNavigation.bind(this)}>Home</Link>
        <Link activeClassName="current" to="/about" onClick={onNavigation.bind(this)}>About</Link>
      </div>
    )
  }
}

export default Navigation

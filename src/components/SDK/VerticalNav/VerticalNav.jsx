import React, {Component} from 'react'
import {Link} from 'react-router'
import './VerticalNav.scss'

export const cssFile = 'VerticalNav.css'
export const scssFile = 'VerticalNav.scss'
export const componentName = 'Vertical navigation'
export const componentDescription = 'Vertically styled navigation with active and hover highlighting.'

class HorizontalNav extends Component {

  renderMenuItems(menuItems,activeLocation) {
    if (!menuItems || menuItems.length === 0) {
      return <a>No items...</a>
    }
    return menuItems.map((item, index) => {
      if (activeLocation === "/" && item.linkTo === activeLocation) {
        return <Link key={index} to={item.linkTo} className="current">{item.name}</Link>
      } else if (!item.linkTo && item.name === 'separator') {
        return <div key={index} className="nav-separator"></div>
      } else {
        return <Link key={index} to={item.linkTo} activeClassName="current">{item.name}</Link>
      }
    })
  }

  render() {

    const {
      menuItems,
      activeLocation
      } = this.props

    return (
      <nav className="g86-vertical-nav">
        {this.renderMenuItems(menuItems,activeLocation)}
      </nav>
    )
  }
}

export default HorizontalNav

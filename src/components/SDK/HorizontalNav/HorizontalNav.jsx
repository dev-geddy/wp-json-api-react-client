import React, {Component} from 'react'
import {Link} from 'react-router'
import './HorizontalNav.scss'

export const cssFile = 'HorizontalNav.css'
export const scssFile = 'HorizontalNav.scss'
export const componentName = 'Horizontal navigation'
export const componentDescription = 'Horizontal, styled navigation without responsiveness.'

class HorizontalNav extends Component {

  renderMenuItems(menuItems,activeLocation) {
    if (!menuItems || menuItems.length === 0) {
      return <a>No items...</a>
    }
    return menuItems.map((item, index) => {
      if (activeLocation === "/" && item.linkTo === activeLocation) {
        return <Link key={index} to={item.linkTo} className="current">{item.name}</Link>
      } else if (!item.linkTo && item.name === 'separator') {
        return <div key={index} className="nav-separator">&nbsp;</div>
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
      <nav className="g86-horizontal-nav">
        {this.renderMenuItems(menuItems,activeLocation)}
      </nav>
    )
  }
}

export default HorizontalNav

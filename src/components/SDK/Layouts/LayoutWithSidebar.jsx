import React, {Component} from 'react'
import './Layout.scss'

export const cssFile = 'Layout.css'
export const scssFile = 'Layout.scss'
export const componentName = 'Layout with sidebar'
export const componentDescription = 'Layout with header, footer and sidebar on the left.'

class LayoutWithSidebar extends Component {

  render() {
    return (
      <div className="g86-layout">
        <div className="g86-app-header">
          Header
        </div>
        <div className="g86-app-body g86-layout-horizontal">
          <div className="g86-aside">
            Aside
          </div>
          <div className="g86-body">
            Body fill width and height
          </div>
        </div>
        <div className="g86-app-footer">
          Footer
        </div>
      </div>
    )
  }
}

export default LayoutWithSidebar

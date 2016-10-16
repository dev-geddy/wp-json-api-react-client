import React, {Component} from 'react'
import './Layout.scss'

export const cssFile = 'Layout.css'
export const scssFile = 'Layout.scss'
export const componentName = 'Vertical layout'
export const componentDescription = 'Vertically layed out site framework.'

class LayoutVertical extends Component {

  render() {
    return (
      <div className="g86-layout">
        <div className="g86-app-header">
          Header
        </div>
        <div className="g86-app-body">
          Body fill height
        </div>
        <div className="g86-app-footer">
          Footer
        </div>
      </div>
    )
  }
}

export default LayoutVertical

import React, {Component} from 'react'
import './Typography.scss'

export const cssFile = 'Typography.css'
export const scssFile = 'Typography.scss'
export const componentName = 'Font sizes'
export const componentDescription = 'Font size variations across the visual style.'

class FontSizes extends Component {

  render() {
    return (
      <div>
        <div className="g86-headline-1">Largest headline 36px</div>
        <hr />
        <div className="g86-headline-2">Page title 25px</div>
        <hr />
        <div className="g86-headline-3">Section title 19px</div>
        <hr />
        <div className="g86-headline-4">Small sub-title 17px</div>
        <hr />
        <div className="g86-text-larger">Slightly larger text 17px</div>
        <hr />
        <div className="g86-text">Normal body text 15px</div>
        <hr />
        <div className="g86-text-smaller">Slightly smaller text 13px</div>
        <hr />
        <div className="g86-text-small">Small text 11px</div>
      </div>
    )
  }
}

export default FontSizes

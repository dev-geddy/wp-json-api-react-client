import React, {Component} from 'react'
import './Typography.scss'

export const cssFile = 'Typography.css'
export const scssFile = 'Typography.scss'
export const componentName = 'Fonts'
export const componentDescription = 'Fonts that are used in this style library.'

class Fonts extends Component {

  render() {
    return (
      <div>
        <div className="g86-font g86-headline-1">Open Sans</div>
        <hr />
        <div className="g86-font-signature g86-signature">Mr De Haviland</div>
      </div>
    )
  }
}

export default Fonts

import React, {Component} from 'react'
import './Typography.scss'

export const cssFile = 'Typography.css'
export const scssFile = 'Typography.scss'
export const componentName = 'Font weights'
export const componentDescription = 'Available font weights to be used with this library.'

class FontWeights extends Component {

  render() {
    return (
      <div>
        <div className="g86-headline-2 g86-weight-light">Open Sans light 300</div>
        <hr />
        <div className="g86-headline-2 g86-weight-normal">Open Sans normal 400</div>
        <hr />
        <div className="g86-headline-2 g86-weight-semibold">Open Sans semibold 600</div>
        <hr />
        <div className="g86-headline-2 g86-weight-bold">Open Sans bold 700</div>
      </div>
    )
  }
}

export default FontWeights

import React, {Component} from 'react'
import './FormElements.scss'

export const cssFile = 'FormElements.css'
export const scssFile = 'FormElements.scss'
export const componentName = 'Input radio'
export const componentDescription = 'Input of type radio.'

class InputRadio extends Component {

  render() {
    /*const {
     ref,
     name,
     value,
     initialValue,
     placeHolder,
     onChange,
     onFocus,
     onBlur
     } = this.props*/
    return (
      <input type="radio" className="input-radio" {...this.props} />
    )
  }
}

export default InputRadio

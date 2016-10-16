import React, {Component} from 'react'
import './FormElements.scss'

export const cssFile = 'FormElements.css'
export const scssFile = 'FormElements.scss'
export const componentName = 'Input text'
export const componentDescription = 'Input of type text.'

class InputText extends Component {

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
      <input type="text" className="input-text" {...this.props} />
    )
  }
}

export default InputText

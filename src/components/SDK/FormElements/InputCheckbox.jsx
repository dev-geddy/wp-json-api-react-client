import React, {Component} from 'react'
import './FormElements.scss'

export const cssFile = 'FormElements.css'
export const scssFile = 'FormElements.scss'
export const componentName = 'Input checkbox'
export const componentDescription = 'Input of type checkbox.'

class InputCheckbox extends Component {
  onHandleChange(e) {

  }
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
      <input type="checkbox" className="input-checkbox" onChange={this.onHandleChange.bind(this)} {...this.props} />
    )
  }
}

export default InputCheckbox

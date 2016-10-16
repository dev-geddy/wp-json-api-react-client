import React, {Component} from 'react'
import './OptionsRow.scss'

export const cssFile = 'OptionsRow.css'
export const scssFile = 'OptionsRow.scss'
export const componentName = 'Options row'
export const componentDescription = 'Custom tnput of type options row.'

class OptionsRow extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedOption: false
    }
  }

  componentWillMount() {
    this.state.selectedOption = this.props.preselectOption ? this.props.preselectOption.value : false
  }

  handleSelection(event) {
    event.preventDefault()

    const {
      name
      } = this.props

    let optionValue = event.currentTarget.value
    let selectedOption = (optionValue === 'true' || optionValue === true) ? true : ((optionValue === 'false' || optionValue === false) ? false : optionValue)
    this.setState({selectedOption})

    this.props.onChange(name, selectedOption)
  }

  render() {

    const {
      name,
      options,
      preselectOption,
      isInterval
      } = this.props

    const {
      selectedOption
      } = this.state


    let intervalSelection = isInterval === true ? true : false

    let optionNodes = options.map((option, key) => {

      let classNames = selectedOption === option.value ? 'selected' : 'not'

      if (intervalSelection === true && selectedOption !== option.value) {
        classNames = classNames + ' selected'
      } else {
        intervalSelection = false
      }

      return (
        <li key={key}
            className={classNames}>
          <button onClick={this.handleSelection.bind(this)}
                  value={option.value}>{option.name}</button>
        </li>
      )
    })

    return (
      <div className="g86-options-row" title={name + ' (default): ' + preselectOption}>
        <ul>
          {optionNodes}
        </ul>
      </div>
    )
  }
}

export default OptionsRow

import React, {Component} from 'react'

class NavigationToggle extends Component {
  render() {

    const {
      isActive
      } = this.props

    return (
      <button className="app-navigation-toggle" onClick={this.props.onClick.bind(this)}>
        {isActive ? <i className="material-icons">clear</i> : <i className="material-icons">menu</i>}
      </button>
    )
  }
}

export default NavigationToggle

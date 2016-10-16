import React, { Component } from 'react'

class Error extends Component {
  render() {
    return (
      <div className="error">
        <i className="material-icons">error_outline</i>
        {this.props.text || 'Error occured...'}
      </div>
    );
  }
}

export default Error

import React, { Component } from 'react'
import './Loader.scss'

class Loader extends Component {
  render() {
    return (
      <div className="g86-loader">
        <div className="loader-cube-grid">
          <div className="loader-cube loader-cube1"></div>
          <div className="loader-cube loader-cube2"></div>
          <div className="loader-cube loader-cube3"></div>
          <div className="loader-cube loader-cube4"></div>
          <div className="loader-cube loader-cube5"></div>
          <div className="loader-cube loader-cube6"></div>
          <div className="loader-cube loader-cube7"></div>
          <div className="loader-cube loader-cube8"></div>
          <div className="loader-cube loader-cube9"></div>
        </div>
        {this.props.text ? <div className="g86-loader-text">{this.props.text}</div> : null}
      </div>
    );
  }
}

export default Loader

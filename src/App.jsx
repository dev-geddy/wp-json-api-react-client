import React, {Component} from 'react'
import './assets/scss/app.scss'

import Header from './components/AppLayout/Header'
import Footer from './components/AppLayout/Footer'
import Navigation from './components/AppLayout/Navigation'
import NavigationToggle from './components/AppLayout/NavigationToggle'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileNavActive: false
    }
  }
  toggleNavigation(e) {
    e.preventDefault()
    this.setState({
      mobileNavActive: !this.state.mobileNavActive
    })
  }
  closeNavigation(e) {
    this.setState({
      mobileNavActive: false
    })
  }
  render() {
    return (
      <div className="app-wrapper">
        <NavigationToggle onClick={this.toggleNavigation.bind(this)} isActive={this.state.mobileNavActive} />
        <Header />
        <div id="bodyWrapper">
          <div id="appBody">
            <div id="appNavigation" className={this.state.mobileNavActive ? 'app-navigation-active' : ''}>
              <Navigation activeLocation={this.props.location.pathname} onNavigation={this.closeNavigation.bind(this)} />
            </div>
            <div id="appContent">{this.props.children}</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App

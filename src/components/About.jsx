import React, { Component } from 'react'

const urls = {
  axios: 'https://github.com/mzabriskie/axios',
  bluebird: 'http://bluebirdjs.com/docs/getting-started.html',
  reactCreateApp: 'https://facebook.github.io/react/blog/2016/07/22/create-apps-with-no-configuration.html',
  jsx: 'https://facebook.github.io/react/docs/jsx-in-depth.html',
  oocss: 'https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/',
  smacss: 'https://smacss.com/',
  es6: 'http://es6-features.org/',
  babelLoader: 'https://github.com/babel/babel-loader',
  nodejs: 'https://nodejs.org/en/',
  sass: 'http://sass-lang.com/guide',
  dom: 'https://www.w3.org/DOM/'
}

class About extends Component {
  render() {
    return (
      <article className="page">
        <header>
          <h2>About React WP API client</h2>
          <p>Built to display and browse WP content</p>
        </header>
        <div className="page-content with-columns">
          <div className="row">
            <div className="column small-12 medium-7 large-8">
              <h3>React WordPress API client application</h3>
              <p>How it works? Well.</p>
              <h3>Application idea</h3>
              <p>Idea definition. Objectives:</p>
              <ul>
                <li>Instant response.</li>
                <li>Content delay visualised by loader.</li>
              </ul>
            </div>
            <div className="column small-12 medium-5 large-4">
              <h3>Technologies used</h3>
              <p>Starting from environment setup and ending up with final touch.</p>
              <ul>
                <li>React, written in <a href={urls.es6} target="_blank">ES6</a> (<a href={urls.babelLoader} target="_blank">transpiled</a> to JS)
                  <ul>
                    <li><a href={urls.axios} target="_blank">Axios</a> for HTTP requests</li>
                    <li><a href={urls.bluebird} target="_blank">Bluebird</a> promises implementation</li>
                  </ul>
                </li>
                <li>
                  <a href={urls.dom} target="_blank">DOM</a> written in <a href={urls.jsx} target="_blank">JSX</a>, visually enhanced using <a href={urls.sass} target="_blank">SCSS</a>, using <a href={urls.smacss} target="_blank">SMACSS</a> method with slight taste of <a href={urls.oocss} target="_blank">OOCSS</a>.
                </li>
                <li><a href={urls.nodejs} target="_blank">NodeJS</a></li>
                <li><a href={urls.reactCreateApp} target="_blank">react-create-app</a> was used to set up local development environment</li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="column small-12 medium-6 large-6">
              <h3>Thank you</h3>
              <p>Brought to you by a front-end developer</p>
              <p>Sincerely,<br/><span className="gediminas">Gediminas Ginkevicius</span></p>
            </div>
          </div>
        </div>
      </article>
    )
  }
}

export default About

import React, {Component} from 'react'
import ReactDOMServer from 'react-dom/server'
import {cleanReactAttributes} from '../../helpers/previewHelper'
import clipboard from 'clipboard-js'

import Error from './Error'
import Loader from './Loader/Loader'

class PreviewBox extends Component {
  renderComponentsPreviews(renderedComponents, inLine = 0) {
    if (!renderedComponents || renderedComponents.length === 0) {
      return (<p>No preview available...</p>)
    }
    return renderedComponents.map((component, index) => {
      if (inLine === 1) {
        return component
      } else {
        return <div key={index}>{component}
          <hr />
        </div>
      }
    })
  }

  componentHTML(renderedComponents) {
    if (!renderedComponents || renderedComponents.length === 0) {
      return 'Not available'
    }
    let previewHtml = ''
    renderedComponents.map((component, index) => {
      previewHtml += cleanReactAttributes(ReactDOMServer.renderToString(component)) + "\n"
      return null
    })

    return previewHtml
  }

  componentsCSS(previewCSS) {
    return previewCSS
  }

  copyHTML(e) {
    e.preventDefault()
    clipboard.copy(this.htmlValue.value)
    console.log('HTML copied to clipboard')
  }

  copyCSS(e) {
    e.preventDefault()
    clipboard.copy(this.cssValue.value)
    console.log('CSS copied to clipboard')
  }

  render() {

    const {
      previewName,
      previewComponents,
      previewComponentsInLine,
      previewHTML,
      previewCSS,
      isLoading,
      error
      } = this.props

    return (
      <div className="preview-box">
        <header>{previewName}</header>
        <div className="preview-box-content">
          {this.renderComponentsPreviews(previewComponents, previewComponentsInLine)}
          {previewComponentsInLine === 1 && <hr />}
        </div>
        <footer>
          {previewHTML === 1 &&
          <div>
            <small>HTML - <a href="#" onClick={this.copyHTML.bind(this)}>COPY</a></small>
            <textArea readOnly defaultValue={this.componentHTML(previewComponents)} ref={(e)=>{ this.htmlValue = e}}/>
          </div>
          }
          {error && <Error text={error} />}
          {isLoading === true && <Loader text="Loading CSS..." />}
          {isLoading === false && error === '' && <div>
            <small>CSS - <a href="#" onClick={this.copyCSS.bind(this)}>COPY</a></small>
            <textArea readOnly defaultValue={this.componentsCSS(previewCSS)} ref={(e)=>{ this.cssValue = e}}/>
          </div>}
        </footer>
      </div>
    )
  }
}

export default PreviewBox

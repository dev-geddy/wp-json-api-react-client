import React, {Component} from 'react'
import AppStore from '../../stores/AppStore'
import AppDispatcher from '../../dispatchers/AppDispatcher'

import Error from './Error'
import Loader from './Loader'

import PreviewBox from './PreviewBox'

class Buttons extends Component {

  constructor(props) {
    super(props)
    this.state = {
      previewCssCode: '',
      isLoading: false
    }
    this._changeListener = this._onStoreChange.bind(this)
  }

  componentWillMount() {
    const {
      previewCssFileName,
      previewCSS
      } = this.props

    if (!previewCSS) return false

    AppStore.addChangeListener(this._changeListener)
    this.state = AppStore.getCssState(previewCssFileName)

    if (this.state.isLoading === false) {
      console.log("REQUEST CSS SOURCE")
      this._requestCssSource(previewCssFileName)
    }
  }

  _requestCssSource(previewCssFileName) {
    AppDispatcher.dispatch({
      actionType: 'GET_CSS_SOURCE',
      cssFile: previewCssFileName
    })
  }

  _onStoreChange() {
    const {
      previewCssFileName,
      previewCSS
      } = this.props

    if (!previewCSS) return false

    const newState = AppStore.getCssState(previewCssFileName)
    this.setState(newState)
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this._changeListener)
  }

  render() {
    const {
      sectionName,
      sectionContent,
      previewName,
      previewComponents,
      previewComponentsInLine,
      previewHTML,
      previewCSS
      } = this.props

    const {
      cssSourceCode,
      isLoading,
      error
      } = this.state

    let cssString = ''

    if (previewCSS === 1 && isLoading === true) {
      cssString = '/* Loading CSS... */'
    } else {
      cssString = cssSourceCode !== '' ? cssSourceCode : '/* CSS could not be loaded... */'
    }

    return (
      <section className="page-content with-columns">
        <div className="row">
          <div className="column small-12 medium-4 large-4">
            <h3>{sectionName}</h3>
            {sectionContent}
          </div>
          <div className="column small-12 medium-8 large-8">
            <PreviewBox previewName={previewName}
                        previewComponents={previewComponents}
                        previewComponentsInLine={previewComponentsInLine}
                        previewHTML={previewHTML}
                        previewCSS={cssString}
                        isLoading={isLoading}
                        error={error} />
          </div>
        </div>
      </section>
    )
  }
}

export default Buttons

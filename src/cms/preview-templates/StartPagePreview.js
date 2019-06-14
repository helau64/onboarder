import React from 'react'
import PropTypes from 'prop-types'
import { StartPageTemplate } from '../../templates/start-page'

const StartPagePreview = ({ entry, getAsset, widgetFor }) => {
  const data = entry.getIn(['data']).toJS()

  if (data) {
    return (
      <StartPageTemplate
        title={data.title}
        content={widgetFor('body')}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

StartPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default StartPagePreview
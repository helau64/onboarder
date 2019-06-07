import React from 'react'
import PropTypes from 'prop-types'
import { CompletePageTemplate } from '../../templates/complete-page'

const CompletePagePreview = ({ entry, widgetFor }) => (
  <CompletePageTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
)

CompletePagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default CompletePagePreview
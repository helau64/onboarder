import React from 'react'
import PropTypes from 'prop-types'
import { SectionPageTemplate } from '../../templates/section-page'

const SectionPagePreview = ({ entry, widgetFor }) => (
  <SectionPageTemplate
    content={widgetFor('body')}
    title={entry.getIn(['data', 'title'])}
  />
)

SectionPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default SectionPagePreview
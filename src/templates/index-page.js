import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const IndexPageTemplate = ({
  title,
  content, 
  contentComponent
}) => {
  const PageContent = contentComponent || Content

  return (
    <div>
      <h1>{title}</h1>
      <PageContent className="content" content={content} />
    </div>
  )
}

IndexPageTemplate.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const IndexPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <IndexPageTemplate
        title={post.frontmatter.title}
        content={post.html}
        contentComponent={HTMLContent}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.object.isRequired
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`

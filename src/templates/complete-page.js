import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import { login, isAuthenticated } from "../utils/auth"

export const CompletePageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section className="complete-page">
        <h1 className="title">{title}</h1>
        <PageContent className="content" content={content} />
    </section>
  )
}

CompletePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const CompletePage = ({ data }) => {
  const { markdownRemark: post } = data

  if (!isAuthenticated()) {
    login()
    return (
      <Layout>
        <section className="complete-page">
          <p>Redirecting to login...</p>
        </section>
      </Layout>
    )
  }

  return (
    <Layout>
      <CompletePageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  )
}

CompletePage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default CompletePage

export const completePageQuery = graphql`
  query CompletePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
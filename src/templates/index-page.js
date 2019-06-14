import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import { login, isAuthenticated } from "../utils/auth"

export const IndexPageTemplate = ({
  title,
  content, 
  contentComponent,
  link
}) => {
  const PageContent = contentComponent || Content

  if (!isAuthenticated()) {
    return (
      <section className="index-page">
        <h1 className="title">Hi</h1>
        <div className="content">
          <p>Please log in to continue.</p>
        </div>
        <div className="link-wrapper">
          <a
            className="button-link"
            href="#login"
            onClick={e => {
              login()
              e.preventDefault()
            }}
          >
            Log in
          </a>
        </div>
      </section>
    )
  }

  return (
    <section className="index-page">
      <h1 className="title">{title}</h1>
      <PageContent className="content" content={content} />
      <div className="link-wrapper">
        <Link to={link} className="button-link">Get started</Link>
      </div>
    </section>
  )
}

IndexPageTemplate.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  link: PropTypes.string,
}

const IndexPage = ({ data }) => {
  const { page: post } = data
  const link = data.sections.edges[0].node.fields.slug

  return (
    <Layout>
      <IndexPageTemplate
        title={post.frontmatter.title}
        content={post.html}
        contentComponent={HTMLContent}
        link={link}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.object.isRequired,
    sections: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    page: markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      html
      frontmatter {
        title
      }
    }
    sections: allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___order] }
      filter: { frontmatter: { templateKey: { eq: "section-page" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
        }
      }
    }
  }
`

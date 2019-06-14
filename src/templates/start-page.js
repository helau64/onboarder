import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import { handleAuthentication, login, isAuthenticated } from "../utils/auth"

export const StartPageTemplate = ({
  title,
  content, 
  contentComponent,
  link
}) => {
  handleAuthentication()

  const PageContent = contentComponent || Content

  return (
    <section className="start-page">
      <h1 className="title">{title}</h1>
      <PageContent className="content" content={content} />
      <div className="link-wrapper">
        <Link to={link} className="button-link">Get started</Link>
      </div>
    </section>
  )
}

StartPageTemplate.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  link: PropTypes.string,
}

const StartPage = ({ data }) => {
  const { page: post } = data
  const link = data.sections.edges[0].node.fields.slug

  if (!isAuthenticated()) {
    login()
    return (
      <Layout>
        <section className="start-page">
          <p>Redirecting to login...</p>
        </section>
      </Layout>
    )
  }

  return (
    <Layout>
      <StartPageTemplate
        title={post.frontmatter.title}
        content={post.html}
        contentComponent={HTMLContent}
        link={link}
      />
    </Layout>
  )
}

StartPage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.object.isRequired,
    sections: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default StartPage

export const pageQuery = graphql`
  query StartPageTemplate {
    page: markdownRemark(frontmatter: { templateKey: { eq: "start-page" } }) {
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
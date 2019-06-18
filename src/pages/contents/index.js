import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'
import { Redirect } from '@reach/router'
import { useIdentityContext} from "react-netlify-identity-widget"

export const ContentsPageTemplate = ({
  sections,
  pages
}) => {
  const identity = useIdentityContext();
  const isLoggedIn = identity && identity.isLoggedIn

  if (!isLoggedIn) {
    return (
      <Redirect to="/" />
    )
  }

  let groupedPages = []

  sections.forEach(function(section) {
    groupedPages.push(pages.filter(page => page.node.frontmatter.section.id === section.node.id))
  })

  

  return (
    <section className="contents-page">
        <h1 className="title">Contents</h1>
        <ul className="contents-list">
          {sections.map((section, index) =>
            <li>
              <h2>{section.node.frontmatter.title}</h2>
              <ul>
                {groupedPages[index].map((page) =>
                  <li>
                    <Link to={page.node.fields.slug}>{page.node.frontmatter.title}</Link>
                  </li>
                )}
              </ul>
              
            </li>
          )}
        </ul>
    </section>
  )
}

ContentsPageTemplate.propTypes = {
  sections: PropTypes.array,
  pages: PropTypes.array
}

const ContentsPage = ({ data }) => {
  const { edges: pages } = data.pages
  const { edges: sections } = data.sections

  return (
    <Layout>
      <ContentsPageTemplate
        sections={sections}
        pages={pages}
      />
    </Layout>
  )
}

ContentsPage.propTypes = {
  data: PropTypes.shape({
    pages: PropTypes.shape({
      edges: PropTypes.array,
    }),
    sections: PropTypes.shape({
      edges: PropTypes.array,
    }),
  })
}

export default ContentsPage

export const contentsPageQuery = graphql`
  query ContentsPage {
    pages: allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___order] }
      filter: { frontmatter: { templateKey: { eq: "info-page" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            section {
                id
            }
          }
        }
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
          frontmatter {
            title
            templateKey
          }
        }
      }
    }
  }
`
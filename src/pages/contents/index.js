import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'

const ContentsPage = ({
  data: {
    allMarkdownRemark: { group }
  },
}) => (
  <Layout>
    <section className="contents-page">
        <h1 className="title">Contents</h1>
        <ul className="contents-list">
            {group.map(section => (
            <li key={section.fieldValue}>
                <h2>{section.fieldValue}</h2>
                <ul>
                {section.edges.map(page => (
                    <li key={page.node.id}>
                        <Link to={page.node.fields.slug}>{page.node.frontmatter.title}</Link>
                    </li>
                ))}
                </ul>
            </li>
            ))}
        </ul>
    </section>
  </Layout>
)

export default ContentsPage

export const contentsPageQuery = graphql`
  query ContentsPageQuery {
    allMarkdownRemark(
        filter: {frontmatter: {templateKey: {eq: "info-page"}}}
        sort: {
            fields: [frontmatter___order]
            order: ASC
        }
    ) {
      group(field: frontmatter___section) {
        fieldValue
        edges {
          node {
            id
            fields {
                slug
            }
            frontmatter {
              title
              order
            }
          }
        }
      }
    }
  }
`
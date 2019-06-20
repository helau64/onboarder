import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'

class PagesIndex extends React.Component {
    render() {
      const { data } = this.props
      const { edges: pages } = data.allMarkdownRemark
      const id = this.props.id

      let sectionPages = pages.filter(page => page.node.frontmatter.section.id === this.props.section)
      let currentPage = sectionPages.findIndex(page => page.node.id === id) + 1

      return (
          <span className="pages-index">{currentPage}/{sectionPages.length}</span>
      )
    }
  }
  
  PagesIndex.propTypes = {
    data: PropTypes.shape({
      allMarkdownRemark: PropTypes.shape({
        edges: PropTypes.array,
      }),
    }),
    section: PropTypes.string,
    id: PropTypes.string
  }
  
  export default props => (
    <StaticQuery
      query={graphql`
        query PagesIndexQuery {
          allMarkdownRemark(
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
        }
      `}
      render={(data) => <PagesIndex data={data} {...props} />}
    />
  )
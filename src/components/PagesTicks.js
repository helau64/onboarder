import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'

class PagesTicks extends React.Component {
    render() {
      const { data } = this.props
      const { edges: pages } = data.allMarkdownRemark
      const id = this.props.id

      let sectionPages = pages.filter(page => page.node.frontmatter.section.id === this.props.section)
      sectionPages.forEach(function(el) {
          if (el.node.id === id) {
              el.node.currentPage = true
          } else {
            el.node.currentPage = false
          }
      })

      return (
          <ul className="pages-ticks">
              {sectionPages &&
                sectionPages.map(({ node: page }) => (
                  <li className={ page.currentPage ? "current-page tick" : "tick"} key={page.id}>
                      <span></span>
                  </li>
              ))}
          </ul>
      )
    }
  }
  
  PagesTicks.propTypes = {
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
        query PagesTicksQuery {
          allMarkdownRemark(
            sort: { order: ASC, fields: [frontmatter___order] }
            filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
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
      render={(data) => <PagesTicks data={data} {...props} />}
    />
  )
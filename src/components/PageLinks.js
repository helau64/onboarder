import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'

class PageLinks extends React.Component {
    render() {
      let link
      const section = this.props.section
      const { edges: posts } = this.props.data.allMarkdownRemark
      const sectionPages = posts.filter(post => post.node.frontmatter.section.id === section)
      const nextPage = sectionPages.findIndex(post => post.node.id === this.props.id) + 1

      if (nextPage < sectionPages.length ) {
        link = <Link to={sectionPages[nextPage].node.fields.slug}>Next</Link>
      } else {
        link = <p>Next section</p>
      }
      return (
          <div>
              {link}
          </div>
      )
    }
  }
  
  PageLinks.propTypes = {
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
        query PageLinksQuery {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___title] }
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
      render={(data) => <PageLinks data={data} {...props} />}
    />
  )
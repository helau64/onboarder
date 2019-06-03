import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'

class SectionLinks extends React.Component {
    render() {
      const { data } = this.props
      const { edges: posts } = data.allMarkdownRemark
  
      return (
        <Link to={posts[0].node.fields.slug}>Next</Link>
      )
    }
  }
  
  SectionLinks.propTypes = {
    data: PropTypes.shape({
      allMarkdownRemark: PropTypes.shape({
        edges: PropTypes.array,
      }),
    }),
  }
  
  export default () => (
    <StaticQuery
      query={graphql`
        query SectionLinksQuery {
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
                }
              }
            }
          }
        }
      `}
      render={(data, count) => <SectionLinks data={data} count={count} />}
    />
  )
import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'

class SectionLink extends React.Component {
    render() {
      const { data } = this.props
      const { edges: posts } = data.allMarkdownRemark
      const pages = posts.filter(post => post.node.frontmatter.section.id === this.props.section)
      let link

      if (pages.length > 0) {
        link = <Link to={pages[0].node.fields.slug} className="next-link">Next</Link>
      } else {
        link = <p>
          There are no pages in this section. <Link to="/admin">Would you like to add some?</Link></p>
      }
      return (
        <div>
          {link}
        </div>
      )
    }
  }
  
  SectionLink.propTypes = {
    data: PropTypes.shape({
      allMarkdownRemark: PropTypes.shape({
        edges: PropTypes.array,
      }),
    }),
    section: PropTypes.string
  }
  
  export default props => (
    <StaticQuery
      query={graphql`
        query SectionLinksQuery {
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
      render={(data, count) => <SectionLink data={data} {...props} />}
    />
  )
import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'

class PageLink extends React.Component {
    render() {
      let link
      const section = this.props.section
      
      const { edges: posts } = this.props.data.pages
      const { edges: sections } = this.props.data.sections
      
      const allPagesInSection = posts.filter(post => post.node.frontmatter.section.id === section)
      const nextPageInSection = allPagesInSection.findIndex(post => post.node.id === this.props.id) + 1

      const nextSection = sections.findIndex(section => section.node.id === this.props.section) + 1

      if (nextPageInSection < allPagesInSection.length ) {
        link = allPagesInSection[nextPageInSection].node.fields.slug
      } 
      else if (nextSection < sections.length) {
        link = sections[nextSection].node.fields.slug
      } 
      else {
        link = "/complete"
      }
      return (
          <div className="next-link_wrapper">
              <Link to={link} className="next-link">Next</Link>
          </div>
      )
    }
  }
  
  PageLink.propTypes = {
    data: PropTypes.shape({
      pages: PropTypes.shape({
        edges: PropTypes.array,
      }),
      sections: PropTypes.shape({
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
          pages: allMarkdownRemark(
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
                  section {
                      id
                  }
                }
              }
            }
          }
        }
      `}
      render={(data) => <PageLink data={data} {...props} />}
    />
  )
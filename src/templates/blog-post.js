import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import PageLinks from '../components/PageLinks'
import Content, { HTMLContent } from '../components/Content'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  title,
  section, 
  id
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      <h1 className="title is-size-2 has-text-weight-bold is-bold-light">{title}</h1>
      <PostContent content={content} />
      <PageLinks section={section} id={id} />
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  section: PropTypes.string,
  id: PropTypes.string
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        id={post.id}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        title={post.frontmatter.title}
        section={post.frontmatter.section.id}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        section {
          id
        }
      }
    }
  }
`

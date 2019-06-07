import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'
import Layout from '../components/Layout'
import PageLink from '../components/PageLink'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  title,
  section, 
  id,
  link,
  image
}) => {
  const PostContent = contentComponent || Content

  let buttonLink

  if (link && link.linkUrl) {
    buttonLink = <a href={link.linkUrl} target="_blank" rel="noopener noreferrer" className="button-link">{link.linkText ? link.linkText : "Go"}</a>
  }

  return (
    <section className="page">
      <h1 className="title">{title}</h1>
      <PostContent content={content} className="content"/>
      {image ? <PreviewCompatibleImage imageInfo={image} /> : null}
      {buttonLink}
      <PageLink section={section} id={id} />
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  section: PropTypes.string,
  id: PropTypes.string,
  link: PropTypes.object,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
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
        link={post.frontmatter.link}
        image={post.frontmatter.image}
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
        order
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        link {
          linkText
          linkUrl
        }
        section {
          id
        }
      }
    }
  }
`

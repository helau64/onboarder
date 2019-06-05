import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SectionLink from '../components/SectionLink'
import Content, { HTMLContent } from '../components/Content'

export const SectionPageTemplate = ({
  content,
  contentComponent,
  title,
  id
}) => {
  const PostContent = contentComponent || Content

  return (
    <section>
      <h1>{title}</h1>
      <PostContent content={content} />
      <SectionLink section={id}/>
    </section>
  )
}

SectionPageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  id: PropTypes.string,
}

const SectionPage = ({ data, test }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <SectionPageTemplate
        id={post.id}
        content={post.html}
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

SectionPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  })
}

export default SectionPage

export const pageQuery = graphql`
  query SectionPageByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
      }
    }
  }
`
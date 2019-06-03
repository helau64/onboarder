import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SectionLinks from '../components/SectionLinks'
import Content, { HTMLContent } from '../components/Content'

export const SectionPageTemplate = ({
  content,
  contentComponent,
  title,
  id
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title} - {id}
            </h1>
            <PostContent content={content} />
            <SectionLinks />
          </div>
        </div>
      </div>
    </section>
  )
}

SectionPageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  id: PropTypes.string,
}

const SectionPage = ({ data }) => {
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
  }),
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
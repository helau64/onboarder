import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'
import Layout from '../components/Layout'
import PageLink from '../components/PageLink'
import PagesTicks from '../components/PagesTicks'
import PagesIndex from '../components/PagesIndex'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { Redirect } from '@reach/router'
import { useIdentityContext} from "react-netlify-identity-widget"

export const InfoPageTemplate = ({
  content,
  contentComponent,
  title,
  section, 
  id,
  link,
  image
}) => {
  const PostContent = contentComponent || Content

  const identity = useIdentityContext();
  const isLoggedIn = identity && identity.isLoggedIn

  if (!isLoggedIn) {
    return (
      <Redirect to="/" />
    )
  }

  let buttonLink

  if (link && link.linkUrl) {
    buttonLink = <a href={link.linkUrl} target="_blank" rel="noopener noreferrer" className="button-link">{link.linkText ? link.linkText : "Go"}</a>
  }

  return (
    <section className="page">
      <PagesTicks section={section} id={id} />
      <h1 className="title">
        <PagesIndex section={section} id={id} />
        {title}
      </h1>
      <div className="content-wrapper">
        <div className="text-wrapper">
          <PostContent content={content} className="content"/>
          <div className="link-wrapper">
            {buttonLink}
            <PageLink section={section} id={id} />
          </div>
        </div>
        {image ? <div className="image-wrapper"><PreviewCompatibleImage imageInfo={image} /></div> : null}
      </div>
    </section>
  )
}

InfoPageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  section: PropTypes.string,
  id: PropTypes.string,
  link: PropTypes.object,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  bg: PropTypes.string,
}

const InfoPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <InfoPageTemplate
        content={post.html}
        id={post.id}
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        section={post.frontmatter.section.id}
        link={post.frontmatter.link}
        image={post.frontmatter.image}
        bg={post.frontmatter.bg}
      />
    </Layout>
  )
}

InfoPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default InfoPage

export const pageQuery = graphql`
  query InfoPageByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        order
        bg
        image {
          childImageSharp {
            fluid(maxWidth: 600, quality: 100) {
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

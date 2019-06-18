import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'

class Navbar extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
          : this.setState({
              navBarActiveClass: '',
            })
      }
    )
  }

  render() {
    const { data } = this.props
    const { edges: pages } = data.allMarkdownRemark
    let currentSection

    let sections = pages

    if (this.props.pageType === "SectionPageTemplate") {
      currentSection = this.props.id
    } else {
      currentSection = this.props.section
    }

    sections.forEach(function(el) {
      if (el.node.id === currentSection) {
          el.node.currentSection = true
      } else {
        el.node.currentSection = false
      }
    })
    
    return (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
            >
              <span className="line" />
              <span className="line" />
              <span className="line" />
            </div>
          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <ul>
              {sections &&
                sections.map(({ node: page }) => (
                  <li className={ page.currentSection ? "navbar-item active" : "navbar-item"} key={page.id}>
                    <Link to={page.fields.slug}>
                      <span>{page.frontmatter.title}</span>
                    </Link>
                  </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
  section: PropTypes.string,
  pageType: PropTypes.string,
  id: PropTypes.string,
}

export default props => (
  <StaticQuery
    query={graphql`
      query NavbarQuery {
        allMarkdownRemark(
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
              }
            }
          }
        }
      }
    `}
    render={(data) => <Navbar data={data} {...props} />}
  />
)
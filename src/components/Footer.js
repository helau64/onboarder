import React from 'react'
import { Link } from 'gatsby'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer">
          <ul className="menu-list">
            <li>
              <Link to="/" className="navbar-item">
                Home
              </Link>
            </li>
            <li>
              <Link to="/contents" className="navbar-item">
                Contents
              </Link>
            </li>
            <li>
              <Link className="navbar-item" to="/suggestions">
                Suggestions
              </Link>
            </li>
            <li>
              <a
                className="navbar-item"
                href="/admin/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Admin
              </a>
            </li>
          </ul>
      </footer>
    )
  }
}

export default Footer

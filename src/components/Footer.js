import React from 'react'
import { Link } from 'gatsby'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer">
          <ul className="menu-list">
            {/* <li>
              {isAuthenticated() ? <a
            href="#logout"
            onClick={e => {
              logout()
              e.preventDefault()
            }}
          >
            Log out
          </a> : <a
            href="#login"
            onClick={e => {
              login()
              e.preventDefault()
            }}
          >
            Log in
          </a>}
            </li> */}
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

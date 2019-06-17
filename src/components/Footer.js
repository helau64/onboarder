import React from 'react'
import { Link } from 'gatsby'
import IdentityModal, { useIdentityContext} from "react-netlify-identity-widget"
import { setConfig } from 'react-hot-loader'

setConfig({ disableHotRenderer: true })

const Footer = () => {
    const identity = useIdentityContext();
    const isLoggedIn = identity && identity.isLoggedIn
    const [dialog, setDialog] = React.useState(false)
    return (
      <>
      <footer className="footer">
          <ul className="menu-list">
            <li>
            <button onClick={() => setDialog(true)}>
              {isLoggedIn ? "Log out" : "Log in"}
            </button>
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
      <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />
      </>
    )
}

export default Footer

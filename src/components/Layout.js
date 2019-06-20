import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../scss/main.scss'
import useSiteMetadata from './SiteMetadata'
import IdentityModal, { useIdentityContext} from "react-netlify-identity-widget"

export default function TemplateWrapper({ children }) {
  const identity = useIdentityContext()
  const { title, description } = useSiteMetadata()

  const isLoggedIn = identity && identity.isLoggedIn

  const [dialog, setDialog] = useState(false)

  return (
    <div className={`${children.type.name} site-container`} style={{
      backgroundColor: children.props.bg ? children.props.bg : ''
    }}>
      <div className="site-content" >
        <Helmet>
          <html lang="en" />
          <title>{title}</title>
          <meta name="description" content={description} />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/img/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            href="/img/favicon-32x32.png"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href="/img/favicon-16x16.png"
            sizes="16x16"
          />
          <link rel="icon" 
            type="image/png" 
            href="/img/favicon.ico" 
            sizes="16x16"
          />
          <link
            rel="mask-icon"
            href="/img/safari-pinned-tab.png"
            color="#ff4400"
          />
          <meta name="theme-color" content="#fff" />

          <meta property="og:type" content="business.business" />
          <meta property="og:title" content={title} />
          <meta property="og:url" content="/" />
          <meta property="og:image" content="/img/og-image.jpg" />
        </Helmet>
        <Navbar section={children.props.section} id={children.props.id} pageType={children.type.displayName}/>
        <main>
          {isLoggedIn ? 
            <div>
              {children}
            </div>
            : 
            <>
              <section className="login-page">
                <h1 className="title">Hi there!</h1>
                <div class="content">
                  <p>Please log in to continue</p>
                </div>
                <div className="link-wrapper">
                  <button className="button-link" onClick={() => setDialog(true)}>
                    Log in
                  </button>
                </div>
              </section>
              <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />
            </>
          }
        </main>
        <Footer />
      </div>
    </div>
  )
}

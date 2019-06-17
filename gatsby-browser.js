import React from "react"
import { IdentityContextProvider } from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css"

export const wrapRootElement = ({ element }) => (
  <IdentityContextProvider url="https://kind-leavitt-a40a7f.netlify.com/">
    {element}
  </IdentityContextProvider>
)
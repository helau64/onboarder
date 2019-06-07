import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isValidated: false }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch(error => alert(error))
  }

  render() {
    return (
      <Layout>
        <section className="suggestions-page">
          <h1 className="title">Suggestions</h1>
          <div class="content">
            <p>Still have questions? Have an idea for something that should be added to the site? Submit them anonymously here.</p>
          </div>
          <form
            name="contact"
            method="post"
            action="/suggestions/thanks/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={this.handleSubmit}
          >
            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
            <input type="hidden" name="form-name" value="contact" />
            <div hidden>
              <label>
                Don’t fill this out:{' '}
                <input name="bot-field" onChange={this.handleChange} />
              </label>
            </div>
            <div className="field">
              <label className="label" htmlFor={'message'}>
                Message
              </label>
              <div className="control">
                <textarea
                  className="textarea"
                  name={'message'}
                  onChange={this.handleChange}
                  id={'message'}
                  required={true}
                />
              </div>
            </div>
            <div className="field">
              <button className="button is-link button-link" type="submit">
                Send
              </button>
            </div>
          </form>
        </section>
      </Layout>
    )
  }
}

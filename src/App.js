import Header from './components/Header'

import initialEmails from './data/emails'

import { useState } from 'react'

import './App.css'

function App() {
  // Use initialEmails for state
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  console.log('state: ', emails, hideRead)

  const toggleRead = targetEmail => {
    // console.log('inside target email: ', targetEmail, emails)

    const updatedEmails = emails.map(email => {
      if (email.id === targetEmail.id) {
        // console.log('found email', email)

        const updatedEmail = {
          ...targetEmail,
          read: !targetEmail.read
        }

        // console.log(updatedEmail)

        return updatedEmail
      } else {
        return email
      }
    })
    setEmails(updatedEmails)
  }

  const toggleStar = targetStar => {
    // console.log('inside target star: ', targetStar, emails)
    const updatedStarred = emails.map(email => {
      if (email.id === targetStar.id) {
        // console.log('found email', email)
        const updatedStar = {
          ...targetStar,
          starred: !targetStar.starred
        }

        // console.log(updatedStar)

        return updatedStar
      } else {
        return email
      }
    })
    setEmails(updatedStarred)
  }

  let filteredEmails = emails

  if (hideRead) {
    filteredEmails = emails.filter(email => !email.read)
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">?</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={() => setHideRead(!hideRead)}
              // onChange={event => setHideRead(event.target.checked)} alternate approach
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {filteredEmails.map(email => {
            return (
              <li className={email.read ? 'email read' : 'email'}>
                <div className="select">
                  <input
                    className="select-checkbox"
                    type="checkbox"
                    checked={email.read}
                    onChange={() => toggleRead(email)}
                  />
                </div>
                <div className={email.starred ? 'star read' : 'star'}>
                  <input
                    className="star-checkbox"
                    type="checkbox"
                    checked={email.starred}
                    onChange={() => toggleStar(email)}
                  />
                </div>
                <div className="sender">{email.sender}</div>
                <div className="title">{email.title}</div>
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  )
}

export default App

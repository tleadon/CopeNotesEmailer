import axios from 'axios'
import React, { useState } from 'react'
import './App.css';

function App() {

  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState("")

  const handleSend = async (event) => {
    event.preventDefault()
    setSent(true)
    try {
      await axios.post("http://localhost:3001/schedule", {
        email
      })
    } catch (error) {
      console.log(error)
    }
    console.log(email)
  }

  return (
    <div className="App">
      {!sent ? (
      <form onSubmit={handleSend}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <button type="submit">
        Register Email
      </button>
    </form> ) : (
      <h1>Email Registered!</h1>
    )
      }
      
    </div>
  );
}

export default App;

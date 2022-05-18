import axios from 'axios'
import React, { useState } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import cnlogo from './images/copenotes.png'
import cnlogowwords from './images/copenoteswwords.png'

function Form() {

  const [sent, setSent] = useState(false) //Used for the page to know to change when the user clicks submit

  const handleSend = async (event) => { //handles the submission of the form
    event.preventDefault() 
    const data = new FormData(event.currentTarget); //put the data from the form into a variable
    setSent(true)
    try {
      await axios.post("http://localhost:3001/schedule", { //fetches the server in server/index.js
        email: data.get('email'), //the data from the form's field's name="x"
        firstName: data.get('firstName'),
        lastName: data.get('lastName')
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      
      {!sent ? (//before the user presses send show this:
        //The Form:
        <Box component="form" onSubmit={handleSend} sx={{ mt: 3 }} padding='30px' alignItems="center" justifyContent="center"> 
          <img src={cnlogowwords} alt="Cope Notes Logo With Words" />
          <br />
          <Typography component="p" >
            Register for 1 email message per minute for 10 minutes.
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>    
            </Grid>
          </Grid>
      </Box>
      ) : (//if the user presses send show this:
        <Typography component="h1" variant="h5" padding="20px">
          <img src={cnlogo} alt='Cope Notes Logo' /> <br />
            Your messages should be arriving shortly!
          </Typography>
      )}
    </Container>
  );
}

export default Form;

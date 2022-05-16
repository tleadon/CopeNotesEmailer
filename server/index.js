const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const nodemailer = require('nodemailer')
require('dotenv').config()

app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

const messages = [
    'hey! I\'m message 1!',
    'hey! I\'m message 2!',
    'hey! I\'m message 3!',
    'hey! I\'m message 4!',
    'hey! I\'m message 5!',
    'hey! I\'m message 6!',
    'hey! I\'m message 7!',
    'hey! I\'m message 8!',
    'hey! I\'m message 9!',
    'hey! I\'m message 10!',
]

app.get("/test", ()=> {
    console.log("Hi.");
})



app.post("/schedule", cors(), async(req, res) => {
    let {email} = req.body
    console.log(email)
    emailNums = [...Array(10).keys()]

    let transport = nodemailer.createTransport({
        service: 'outlook',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        }
    })
    let count = 1
    while(emailNums.length){
        const random = Math.floor(Math.random() * emailNums.length);
        const element = emailNums.splice(random, 1)[0];
        await transport.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject:"Yo yo yoooo",
            html:`<p> ${messages[element]} but the ${count} in order of sending</p>`,
        })
        count++;
        await new Promise(r => setTimeout(r, 60000));
    }
})

app.listen(3001, () => {
    console.log("Listening on port 3001...")
})

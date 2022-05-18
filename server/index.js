const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); //CommonJS fix for node-fetch needing import
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const nodemailer = require('nodemailer')
require('dotenv').config()

app = express() //initializing express and all the middleware i need to use
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

const messages = [ //all the messages to be sent (10)
    'Bark, Bark!',
    'blaf, blaf! (bark in Afrikaans)',
    'ham, ham! (bark in Albanian)',
    'vau, vau! (bark in Croatian)',
    'ワンワン! (bark in Japanese)',
    'guk, guk! (bark in Indonesian)',
    'γαβ, γαβ! (bark in Greek)',
    'hav, hav! (bark in Hebrew)',
    'bau, bau! (bark in Italian)',
    'guau-guau! (bark in Spanish)',
]

app.post("/schedule", cors(), async(req, res) => {
    let {email} = req.body
    let {firstName} = req.body
    let {lastName} = req.body
    console.log(`Email: ${email}
                First Name: ${firstName}
                Last Name: ${lastName}`)

    emailNums = [...Array(10).keys()] //array from 0-9 to pick randomly from for the email messages

    let transport = nodemailer.createTransport({ //initailizing nodemailer object to send the email
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
        const random = Math.floor(Math.random() * emailNums.length); //picks a random number from the emailNums array
        const element = emailNums.splice(random, 1)[0]; //gets that number we picked and removes it from the emailNums array
        let dogimage = null
        await fetch('https://dog.ceo/api/breeds/image/random') //fetching a random picture of a doc
        .then(response => response.json())
        .then(data => {
            dogimage = data.message;
        })
        .catch(error => console.log(error))
        await transport.sendMail({ //sending the email
            from: process.env.EMAIL,
            to: email,
            subject:`Hey ${firstName} Dog Quote! #${count}`,
            html:`
            <table align="center" border="0" cellpadding="0" cellspacing="0" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="144px">
            <tr>
            <td style="padding:0 2px 0 2px;"><a href="https://www.facebook.com/CopeNotes/" target="_blank"><img alt="Facebook" height="32" src="cid:facebook" style="display: block; height: auto; border: 0;" title="Facebook" width="32"/></a></td>
            <td style="padding:0 2px 0 2px;"><a href="https://twitter.com/copenotes" target="_blank"><img alt="Twitter" height="32" src="cid:twitter" style="display: block; height: auto; border: 0;" title="Twitter" width="32"/></a></td>
            <td style="padding:0 2px 0 2px;"><a href="https://www.instagram.com/copenotes/?hl=en" target="_blank"><img alt="Instagram" height="32" src="cid:instagram" style="display: block; height: auto; border: 0;" title="Instagram" width="32"/></a></td>
            <td style="padding:0 2px 0 2px;"><a href="https://www.linkedin.com/company/copenotes/" target="_blank"><img alt="LinkedIn" height="32" src="cid:linkedin" style="display: block; height: auto; border: 0;" title="LinkedIn" width="32"/></a></td>
            </tr>
            </table>
            <br />
            <img src="${dogimage}" alt="dog image" />
            <br />
            <p> Dog Quote: "${messages[element]}`,
            attachments: [{
                    filename: 'facebook.png',
                    path: 'images/facebook2x.png',
                    cid: 'facebook' //same cid value as in the html's img srcs
                },
                {
                    filename: 'twitter.png',
                    path: 'images/twitter2x.png',
                    cid: 'twitter'    
                },
                {
                    filename: 'instagram.png',
                    path: 'images/instagram2x.png',
                    cid: 'instagram'    
                },
                {
                    filename: 'linkedin.png',
                    path: 'images/linkedin2x.png',
                    cid: 'linkedin'    
                },
            ]
        })
        count++;
        await new Promise(r => setTimeout(r, 60000)); //waits 60000 milliseconds (about 60 seconds (about 1 minute))
    }
})

app.listen(3001, () => {//uses port 3001
    console.log("Listening on port 3001...")
})

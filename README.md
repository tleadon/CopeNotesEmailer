# CopeNotesEmailer
 Email Scheduler made according to the Cope Notes google docs assignment documentation. Input your email and recieve 10 random emails for 10 minutes!
 Used React, Node, Express, and node-mailer.
 
 ## Installation
 Instructions on how to set up the backend and front end.
 
 ### Backend - server/index.js
 Ensure that [Node](https://nodejs.org/en/download/) is installed.
 Open this project's folder:
 
 Go to the server folder turn on the server.
 ```cmd
cd server
npm i <!--- to install the dependencies --->
npm ## start
```

Should be log:
```cmd
> server@1.0.0 start
> node index.js     

Listening on port 3001...
```
Keep this running for the frontend end to be able to send emails.

### Frontend - frontend/

if you have yarn:
```cmd
yarn start
```

otherwise:
```cmd
npm i
npm start
```

should run on http://localhost:3000/

## Usage

Enter any first name, last name and email. Then, the program will send 10 messages randomly picked from 10 hardcoded messages with random pictures of dogs accompanying them.

Thank you for reading!


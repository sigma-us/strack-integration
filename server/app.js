const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const app = express();
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const LOCAL = process.env.LOCAL || false;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
// app.use(awsServerlessExpressMiddleware.eventContext())


app.use(session({
    secret: process.env.SESSION_SECRET || 'this shit hits',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 14400000,
      secure: false,
    },
    rolling: true,
  }));

/*
    Start using Passport authentication for all routes declared after this middleware
    Except for the path of /login
*/
// serve app files before auth routes in order to allow login page to load
// app.use(express.static(path.join(__dirname, '../dist')));


/**
 * Example for using the Slack RTM API.
 */

// const { RTMClient } = require('@slack/client');

// // Get an API token by creating an app at <https://api.slack.com/apps?new_app=1>
// // It's always a good idea to keep sensitive data like the token outside your source code. Prefer environment variables.
// const token = process.env.SLACK_API_TOKEN || '';
// if (!token) { console.log('You must specify a token to use this example'); process.exitCode = 1; return; }

// // Initialize an RTM API client
// const rtm = new RTMClient({token});
// // Start the connection to the platform
// rtm.start();

// // Log all incoming messages
// rtm.on('message', (event) => {
//   // Structure of `event`: <https://api.slack.com/events/message>
//   console.log(`Message from ${event.user}: ${event.text}`, event);
// })

// // Log all reactions
// rtm.on('reaction_added', (event) => {
//   // Structure of `event`: <https://api.slack.com/events/reaction_added>
//   console.log(`Reaction from ${event.user}: ${event.reaction}`, event);
// });
// rtm.on('reaction_removed', (event) => {
//   // Structure of `event`: <https://api.slack.com/events/reaction_removed>
//   console.log(`Reaction removed by ${event.user}: ${event.reaction}`, event);
// });

// // Send a message once the connection is ready
// rtm.on('ready', (event) => {

//   // Getting a conversation ID is left as an exercise for the reader. It's usually available as the `channel` property
//   // on incoming messages, or in responses to Web API requests.

//   const conversationId = 'DD2ALH4TD';
//   rtm.sendMessage('Hello, world!', conversationId);
// });

/*
Declare routes after authentication check
*/
app.get('/', (req, res) => {
  res.send("Hello World!");
})
app.use('/', require('./routes'));

// We need one on the bottom too
// app.use('*', express.static(path.join(__dirname, '../dist')));


module.exports = app;


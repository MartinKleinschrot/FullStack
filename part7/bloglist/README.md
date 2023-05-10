# Bloglist

## What does it do: 
Blog application with:
- token based user administration with encrypted passwords
- tests via cypress, jest and supertest
- front and backend connecting to a MongoDB
- linting via ESLINT and prettier
- deployment to Heroku

## How to start the app:
In the backend run: `npm run build:ui` to build the frontend.

Then run the app with: `npm start`

### Requirements
.env file with:

PORT = [PORT]

MONGODB_URI = 'mongodb+srv://[user]:[password]@cluster0.8q0ib.mongodb.net/BlogListApp?retryWrites=true&w=majority'

SECRET = [secretforjwtencryption]
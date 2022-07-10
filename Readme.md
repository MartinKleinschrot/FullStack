# Cheat-Sheet for https://fullstackopen.com/

## Once (globally)

    sudo npm install --global cross-env
    npm install -g npm-check-updates
    ncu -u // update dependencies

***

## Git-Import:
    rm -rf .git
    npm install

***

## Frontend style:
    npm install react-bootstrap
    npm install @mui/material @emotion/react @emotion/styled
    npm install styled-components

***

## Bundling with Webpack
    npm install --save-dev webpack webpack-cli
    npm install @babel/core babel-loader @babel/preset-react --save-dev
    npm install @babel/core babel-loader @babel/preset-react --save-dev
    npm install @babel/preset-env --save-dev
    npm install style-loader css-loader --save-dev
    npm install --save-dev webpack-dev-server

***

## Frontend (react)
### Setup:  
    npx create-react-app my-app
    npm install axios
    npm install prop-types
    npm install --save-dev eslint-plugin-jest
    npm install --save-dev @testing-library/react @testing-library/jest-dom
    npm install --save-dev @testing-library/user-event
    npm install -D --exact jest-watch-typeahead@0.6.5
    npm install --save-dev cypress
    npm install eslint-plugin-cypress --save-dev
    npm install redux
    npm install --save-dev deep-freeze
    npm install react-redux
    npm install @reduxjs/toolkit
    npm install redux-thunk
    npm install react-router-dom
    npm install @apollo/client subscriptions-transport-ws
#### Edit file package.json
    "scripts": {
      "start": "react-scripts start",
      "build": "react-scripts build",
      "test": "react-scripts test",
      "eject": "react-scripts eject",
      "eslint": "eslint .",
      "cypress:open": "cypress open",
      "test:e2e": "cypress run"
      },
### Test:
    CI=true npm test -- --coverage
### Run:
    npm start
### Build: 
    npm run build

***

## Backend (mongodb)
###	Setup:
    npm init
    npm install express
    npm install --save-dev nodemon
    npm install cors
    npm install morgan
    npm install mongoose
    npm install dotenv
    npm install eslint --save-dev
    npm install --save-dev jest
    npm install --save-dev supertest
    npm install express-async-errors
    npm install bcrypt
    npm install jsonwebtoken
    npm install apollo-server-express apollo-server-core express @graphql-tools/schema
    npm install subscriptions-transport-ws graphql-subscriptions
#### Edit file package.json
    "scripts": {
      "start": "NODE_ENV=production node index.js",
      "dev": "NODE_ENV=development nodemon index.js",
      "build:ui": "rm -rf build && cd ../part2-notes/ && npm run build && cp -r build ../notes-backend",
      "deploy": "git push heroku main",
      "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && git push && npm run deploy",    
      "logs:prod": "heroku logs --tail",
      "lint": "eslint .",
      "test": "NODE_ENV=test jest --verbose --runInBand --forceExit",
      "start:test": "NODE_ENV=test node index.js"
      }
      "proxy": "http://localhost:3001"
    }
      //...
    "jest": {
      "testEnvironment": "node"
    }
    }
#### Create .gitignore file
      /node_modules
      /build
#### Create .eslintrc.js 
      module.exports = {
        'env': {
        'browser': true,
        'commonjs': true,
        'es2021': true,
        
        'node': true,
        'jest': true,
        },
        'extends': 'eslint:recommended',
        'parserOptions': {
        'ecmaVersion': 'latest'
        },
        'rules': {
        'indent': [
          'error',
          2
        ],
        'linebreak-style': [
          'error',
          'unix'
        ],
        'quotes': [
          'error',
          'single'
        ],
        'semi': [
          'error',
          'never'
        ],
        'eqeqeq': 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [
          'error', 'always'
        ],
        'arrow-spacing': [
          'error', { 'before': true, 'after': true }
        ],
        'no-console': 0
        }
      }
###	Run:
    npm run dev
###	Deploy:
###	Setup:
    (once) sudo npm install -g heroku
    heroku create
    git push heroku main
    const PORT = process.env.PORT || 3001
    Procfile with "web: npm start"

***

## GraphQL-Server:
###	Setup:
    npm init
    npm install apollo-server graphql

***

## JSON-Server-app:
### Setup:
    (once) sudo npm install -g json-server oder npm install json-server --save-dev
    db.json file in root
    routes.json in root for specific routes
###	Run:
    npx json-server --port 3001 --watch db.json --routes routes.json

***

## TypeScript
### Setup:
    npm install -g ts-node typescript
    npm install --save-dev ts-node typescript
    npm install --save-dev @types/node
    npm install express
    npm install --save-dev @types/express
    npm install --save-dev ts-node-dev
    npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
#### Edit file package.json
  "scripts": {
    "ts-node": "ts-node",
    "multiply": "ts-node multiplier.ts",
    "calculate": "ts-node calculator.ts",
    "start": "ts-node index.ts",
    "dev": "ts-node-dev index.ts",
    "lint": "eslint --ext .ts ."
    },
#### Create .eslintrc.js 
   {
      "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
      ],
      "plugins": ["@typescript-eslint"],
      "env": {
        "node": true,
        "es6": true
      },
      "rules": {
        "@typescript-eslint/semi": ["error"],
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/restrict-plus-operands": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          { "argsIgnorePattern": "^_" }
        ],
        "no-case-declarations": "off"
      },
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "project": "./tsconfig.json"
      }
    }
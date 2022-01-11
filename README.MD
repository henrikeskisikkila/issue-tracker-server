### Issue Tracker Server

Issue Tracker Server is REST API service that offers its services to
a client interface. 


### Built With

This server is built with following frameworks, libraries and deployment tools.

* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Mongoose](https://mongoosejs.com/)
* [Bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)
* [Jest](https://jestjs.io/)
* [Passport](https://www.passportjs.org/)
* [Docker](https://www.docker.com/)
* [AWS Code Build](https://aws.amazon.com/codebuild/)

## Getting Started

This is how you setting up this project locally. Get a local copy up and 
follow these simple steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/henrikeskisikkila/issue-tracker-server.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a .env file and set these variables based on your environment
   MongoDB uri that includes authentication parameters
   ```sh
   MONGODB_URI=
   ```
   Secret session key that is used to hash session data
   ```sh
   SESSION_SECRET=
   ```

## Usage
Issue Tracker Server is a REST API that you can use to manage issue related information. Following REST API resources are available:

Authentication

Authenticate a user
   ```sh
    POST /authentication
   ```

Project

Create a new project
   ```sh
    POST /project
   ```

Issue

Get all issues
   ```sh
   GET /issues
   ```
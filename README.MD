## Issue Tracker Server

Issue Tracker Server is a REST API service. It makes possible to manage issue related
information. Users can sign up, login, create, update, and remove projects and issues.

### Built With

This server is built with following frameworks, libraries, and deployment tools.

* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Passport](https://www.passportjs.org/)
* [Bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)
* [Jest](https://jestjs.io/)
* [Mongoose](https://mongoosejs.com/)
* [Docker](https://www.docker.com/)
* [AWS Code Build](https://aws.amazon.com/codebuild/)

## Getting Started

This is how you set up this project locally. Follow these simple steps.

### Prerequisites

Download and install [Node.js](https://nodejs.org/en/download/)

Check that installation is complete.

* Node.js
  ```sh
  node -v
  ```

* npm
  ```sh
  npm -v
  ```

Download and install [MongoDB](https://www.mongodb.com/try/download/community)
or configure [a cloud based MongoDB](https://account.mongodb.com/account/login)

### Installation

1. Clone the repo.
   ```sh
   git clone https://github.com/henrikeskisikkila/issue-tracker-server.git
   ```
2. Install npm packages.
   ```sh
   npm install
   ```
3. Create an .env file and set these variables based on your environment.
   MongoDB uri that includes authentication parameters.
   ```sh
   MONGODB_URI=
   ```
   Secret session key that is used to hash session data.
   ```sh
   SESSION_SECRET=
   ```
4. Start server
   ```sh
   npm run start
   ```
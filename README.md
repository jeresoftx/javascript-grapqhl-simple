# javascript-grapqhl-simple

[![ MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jeresoftx/javascript-grapqhl-simple/blob/main/LICENSE)

This README provides a guide for setting up and running the project.

## Prerequisities

```sh
Node.js v18.17.0
NVM
Docker
```

## Step-by-Step Setup Guide

- ### Step 1: Install Node.js v18.17.0

Before you can run this project, you need to ake sure that Node.js v18.17.0 is isntalled on your computer. To install Node.js, you can download it form the official [Node.js website](https://nodejs.org/)

> Alternatively, you can use a version manager like `nvm` to install Node.js. Here's how you would install Node.js v14.x using `nvm`:

```sh
nvm install 18.17.0
nvm use 18.17.0
```

- ### Step 2: Install Docker

Docker is required to create and manage the containers in which the project runs. You can download Docker from the official [Docker website](https://www.docker.com/products/docker-desktop).

### Step 3: Install Project Dependencies

Once Node.js and Docker are installed, navigate to the project directory and run the following command to install the project dependencies:

```sh
npm i
```

- ### Step 4: Start Docker Containers

Now, you can use the provided npm script to start the Docker containers necessary for the project:

```sh
npm run start:stack
```

This command will build and start the Docker containers. Make sure Docker is running before executing this command.

- ### Step 5: Start the Application

You can start the application by running:

```sh
npm start
```

- ### Step 6: Test the Application

Finally, you can test the application by running:

```sh
npm test
```

This command will start the Node.js application. You should now be able to access the application through your web browser.

## Congratulations!

You have successfully set up and started the application. If you encounter any issues or have any questions, please refer to [github issue site](https://github.com/jeresoftx/javascript-grapqhl-simple/issues)

## CONTRIBUTOR

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

## OTHERS

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
# MERN: Full-stack Chat Application

#### Introduction

The MERN stack which consists of **Mongo DB**, **Express.js**, **Node.js**, and **React.js** is a popular stack for building full-stack web-based applications because of its simplicity and ease of use. In recent years, with the explosive popularity and the growing maturity of the JavaScript ecosystem, the MERN stack has been the goto stack for a large number of web applications. This stack is also highly popular among newcomers to the JS field because of how easy it is to get started with this stack.
<br/><br/>
This repo consists of a **Chat Application** built with the MERN stack. I built this sometime back when I was trying to learn the stack and I have left it here for anyone new to the stack so that they can use this repo as a guide.
<br/><br/>
This is a full-stack chat application that can be up and running with just a few steps. 
Its frontend is built with [Material UI](https://material-ui.com/) running on top of React.
The backend is built with Express.js and Node.js.
Real-time message broadcasting is developed using [Socket.IO](https://socket.io/).

### Features

This application provides users with the following features
<br/>
* Authentication using **JWT Tokens**
* A **Global Chat** which can be used by anyone using the application to broadcast messages to everyone else.
* A **Private Chat** functionality where users can chat with other users privately.
* Real-time updates to the user list, conversation list, and conversation messages

#### Screenshots

##### Global Chat
![Global Chat](https://i.imgur.com/VkdwAme.png)
<br/><br/>
##### Private Chat
![Private Chat](https://i.imgur.com/jdCBYu4.png)
<br/><br/>
##### Login
![Login](https://i.imgur.com/6iobucn.png)
<br/><br/>
##### Register
![Register](https://i.imgur.com/AMkpl9C.png)

### How to use

You can have this application up and running with just a few steps because it has both the frontend and the backend in a single repository. Follow the steps below to do so.

1. Clone this repo
2. Once you have the repo, you need to install its dependencies. So using a terminal, move into the root directory of the project and execute `npm install` to install the dependencies of the Node.js server and then run `npm run client-install` to install the dependencies of the frontend. The second command is a custom command that I wrote to simplify the installation process.
3. This application uses MongoDB as its Database. So make sure you have it installed. You can find detailed guides on how to do so [here](https://docs.mongodb.com/manual/administration/install-community/). Once installed, make sure that your local MongoDB server is not protected by any kind of authentication. If there is authentication involved, make sure you edit the `mongoURI` in the `config/keys.js` file.
4. Finally, all you have to do is simply run `npm run dev`. If this command fails, try installing the package [concurrently](https://www.npmjs.com/package/concurrently) globally by running `npm install -g concurrently` and then running the `dev` command.
5. The frontend of the application will be automatically opened in your web browser and you can test it away.


### Things to note

* The frontend is created using [create-react-app](https://github.com/facebook/create-react-app)
* Database connections in the backend are handled using the [Mongoose ORM](https://mongoosejs.com/)
* Code quality is ensured using (ESLint)[https://eslint.org/]

### Disclaimer

This repository contains beginner level code and might contain some things I wish to change or remove. I have not maintained this for quite some time, but now I am trying to slowly fix these issues. You are welcome to open issues if you find any and I will accept PR's as well.
<br/><br/>

Cheers 💻 🍺 🔥 🙌

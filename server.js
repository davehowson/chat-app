const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const users = require("./routes/api/users");
const messages = require("./routes/api/messages");

const app = express();

// Port that the webserver listens to
const port = process.env.PORT || 5000;

// Express and socket.io on same server
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server,{
  cors:{
    origin:'*',
  }
})
//Don't use app.listen()  because it will listen only for express server and socket.io will not work(it won't throw error either so be cautious)
server.listen(port, () =>
console.log(`Server running on port ${port}`)
);
// Body Parser middleware to parse request bodies
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// CORS middleware
app.use(cors());

// Database configuration
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Successfully Connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Assign socket object to every request
app.use(function (req, res, next) {
  req.io = io;
  next();
});

// Routes
app.use("/api/users", users);
app.use("/api/messages", messages);

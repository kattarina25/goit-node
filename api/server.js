const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const MONGODB_URL =
  process.env.MONGODB_URL ||
  "mongodb+srv://admin:admin@goit.vxqdu.mongodb.net/db-contacts?retryWrites=true&w=majority";
const morgan = require("morgan");
const cors = require("cors");
const contactsRouter = require("./contacts/contacts.router");

module.exports = class ContactsServer {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    await this.initDataBase();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(morgan("tiny"));
  }

  initRoutes() {
    this.server.use("/api/contacts", contactsRouter);
  }

  async initDataBase() {
    try {
      await mongoose.connect(MONGODB_URL);
      console.log("Database connection successful");
    } catch (err) {
      console.log(err), process.exit(1);
    }
  }

  startListening() {
    this.server.listen(PORT, () => {
      console.log("Started listening on port", PORT);
    });
  }
};

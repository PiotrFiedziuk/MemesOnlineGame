import express from "express";
import { store } from "../../services/Store";
import cors from "cors";
import parser from "body-parser";

export class AuthApi {
  private app = express();
  private port = 3000;

  constructor() {
    this.app.use(cors());
    this.app.use(parser.json());
    this.initializeEndpoints();
    this.app.listen(this.port);
  }

  private initializeEndpoints() {
    this.store();
    this.login();
  }

  private store() {
    this.app.get("/store", (req, res) => {
      res.send(JSON.stringify(store));
    });
  }

  private login() {
    this.app.post("/login", (req, res) => {
      const username: string = req.body.username;
      if (store.loggedUsers.includes(username)) {
        res.status(401);
        res.send("Istnieje już taki użytkownik");
      } else {
        store.addUser(username);
        res.status(200);
        res.send();
      }
    });
  }
}

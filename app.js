// https://expressjs.com/es/starter/hello-world.html

import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import history from "connect-history-api-fallback";
import mongoose from "mongoose";

const app = express();
const port = 3500;
const uri = "mongodb://localhost:27017/mevn";
// const uri = "mongodb+srv://agustin96:u3RsiHXjyTleWty7@personal.kc5mn.mongodb.net/notes?retryWrites=true&w=majority";
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.connect(uri, options).then(
  () => {
    console.log("Conectado a MongoDB");
  },
  (err) => {
    console.log(err);
  }
);

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api", require("./routes/note"));
app.use("/api", require("./routes/user"));
app.use("/api/login", require("./routes/login"));

// Middleware para Vue.js router modo history
// https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
app.use(history());
app.use(express.static(path.join(__dirname, "public")));

app.set("port", process.env.PORT || port);

app.listen(app.get("port"), () => {
  console.log(`Example app listening at http://localhost:${app.get("port")}`);
});

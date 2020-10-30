import express from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import _ from "underscore";

const router = express.Router();
const salt = 10;

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.post("/users", async (req, res) => {
  const body = {
    ...req.body,
    password: bcrypt.hashSync(req.body.password, salt),
  };

  try {
    const user = await User.create(body);

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.get("/users/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.put("/users/:id", async (req, res) => {
  const _id = req.params.id;
  const body = _.pick(req.body, ["name", "email", "password", "active"]);

  if (body.password) body.password = bcrypt.hashSync(body.password, salt);

  try {
    const user = await User.findByIdAndUpdate(_id, body, {
      new: true,
      runValidators: true,
      context: "query",
    }); // cuando new es true devuelve el usuario modificado, sino devuelve el usuario antertior a ser modificado

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = router;

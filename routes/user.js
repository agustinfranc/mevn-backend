import express from "express";
import User from "../models/user";

const router = express.Router();

router.post("/users", async (req, res) => {
  const body = req.body;

  try {
    const user = await User.create(body);
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.get("/users/:id", async (req, res) => {
  const id = req.params.id

  try {
    const user = await User.findById(id);

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = router;
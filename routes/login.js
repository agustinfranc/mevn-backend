import express from "express";
import User from "../models/user";
import bcrypt from "bcrypt";

const router = express.Router();
const salt = 10;

router.post("/", async (req, res) => {
  const body = req.body;

  // return res.json({body});

  try {
    const user = await User.findOne({ email: body.email });

    if (!user) {
      return res.status(500).json({ error: { message: "User not found" } });
    }

    if (!bcrypt.compareSync(body.password, user.password)) {
      return res.status(500).json({ error: { message: "User not found" } });
    }

    return res.json({ user, token: "" });
  } catch (error) {
    return res.status(500).json({
      error: { message: error.message, name: error.name, stack: error.stack },
      message: "Ups, something went wrong",
    });
  }
});

module.exports = router;

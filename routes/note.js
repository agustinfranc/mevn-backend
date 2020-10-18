import express from "express";
import Nota from "../models/note";

const router = express.Router();

router.post("/note", async (req, res) => {
  const body = req.body;

  try {
    const note = await Nota.create(body);
    return res.status(200).json(note);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

module.exports = router;
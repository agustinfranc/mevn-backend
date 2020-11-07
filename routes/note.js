import express from "express";
import Note from "../models/note";
import { verifyAuth, verifyAdmin } from "../middlewares/authentication";

const router = express.Router();

router.get("/notes", verifyAuth, async (req, res) => {
  try {
    const note = await Note.find({user_id: req.user._id});
    return res.json(note);
  } catch (error) {
    return res.status(500).json({
      error: { message: error.message, name: error.name, stack: error.stack },
      message: "Ups, something went wrong",
    });
  }
});

router.post("/notes", verifyAuth, async (req, res) => {
  const body = req.body;
  body.user_id = req.user._id;

  try {
    const note = await Note.create(body);
    return res.json(note);
  } catch (error) {
    return res.status(500).json({
      error: { message: error.message, name: error.name, stack: error.stack },
      message: "Ups, something went wrong",
    });
  }
});

router.get("/notes/:id", verifyAuth, async (req, res) => {
  const _id = req.params.id;

  try {
    const note = await Note.findOne({ _id });

    if (!note) {
      return res.status(500).json({ error: "No se encuentra la nota" });
    }

    return res.json(note);
  } catch (error) {
    return res.status(500).json({
      error: { message: error.message, name: error.name, stack: error.stack },
      message: "Ups, something went wrong",
    });
  }
});

router.put("/notes/:id", verifyAuth, async (req, res) => {
  const _id = req.params.id;
  const body = req.body;

  try {
    const note = await Note.findByIdAndUpdate(_id, body, { new: true });

    if (!note) {
      return res.status(500).json({ error: "No se encuentra la nota" });
    }

    return res.json(note);
  } catch (error) {
    return res.status(500).json({
      error: { message: error.message, name: error.name, stack: error.stack },
      message: "Ups, something went wrong",
    });
  }
});

router.delete("/notes/:id", verifyAuth, async (req, res) => {
  const _id = req.params.id;

  try {
    const note = await Note.findByIdAndDelete({ _id });

    if (!note) {
      return res.status(500).json({ error: "No se encuentra la nota" });
    }

    return res.json(note);
  } catch (error) {
    return res.status(500).json({
      error: { message: error.message, name: error.name, stack: error.stack },
      message: "Ups, something went wrong",
    });
  }
});

module.exports = router;

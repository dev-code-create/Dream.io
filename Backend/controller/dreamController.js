import { validationResult } from "express-validator";
import Dream from "../models/Dream.js";

export const createDream = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, description } = req.body;

  try {
    const dream = new Dream({
      user: req.user.id,
      title,
      description,
    });
    const savedDream = await dream.save();
    req.io.emit("newDream", {
      dreamId: dream.id,
      userId: req.user.id,
    });
    res.json(savedDream);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

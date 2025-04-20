import { validationResult } from "express-validator";
import Dream from "../models/Dream.js";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

export const getUserDreams = async (req, res) => {
  try {
    const dreams = await Dream.find({ user: req.user.id }).sort("-createdAt");
    res.json(dreams);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

export const interpretDream = async (req, res) => {
  try {
    const dream = await Dream.findById(req.params.id);
    if (!dream) {
      return res.status(404).json({ msg: "Dream not found" });
    }
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a dream interpretation expert." },
        { role: "user", content: dream.description },
      ],
    });
    dream.interpretation = response.choices[0].message.content;
    await dream.save();
    res.json(dream);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

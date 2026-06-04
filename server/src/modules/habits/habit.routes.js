import express from "express";
import Habit from "./habit.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const habits = await Habit.find();
  res.json(habits);
});

router.post("/", async (req, res) => {
  console.log(req.body);

  const habit = await Habit.create(req.body);

  res.status(201).json(habit);
});


router.delete("/:id", async (req, res) => {
  try {
    const habit = await Habit.findByIdAndDelete(
      req.params.id
    );

    if (!habit) {
      return res
        .status(404)
        .json({ message: "Habit not found" });
    }

    res.json({
      message: "Habit deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(habit);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
import express from "express";
import HabitLog from "./habitLog.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { habitId, date } = req.body;

    const existingLog = await HabitLog.findOne({
      habitId,
      date,
    });

    if (existingLog) {
      return res.status(400).json({
        message: "Habit already completed today",
      });
    }

    const log = await HabitLog.create({
      habitId,
      date,
    });

    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/streak/:habitId", async (req, res) => {
  try {
    const logs = await HabitLog.find({
      habitId: req.params.habitId,
    }).sort({
      date: -1,
    });

    const completedDates = logs.map(
      (log) => log.date
    );

    let streak = 0;

    let currentDate = new Date();

    while (true) {
      const dateString = currentDate
        .toISOString()
        .split("T")[0];

      if (completedDates.includes(dateString)) {
        streak++;
      } else {
        break;
      }

      currentDate.setDate(
        currentDate.getDate() - 1
      );
    }

    const today = new Date()
  .toISOString()
  .split("T")[0];

res.json({
  streak,
  completedToday:
    completedDates.includes(today),
});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
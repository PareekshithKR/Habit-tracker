import express from "express";
import cors from "cors";
import habitRoutes from "./modules/habits/habit.routes.js";
import habitLogRoutes from "./modules/habitLogs/habitLog.Routes.js";

const app = express();

app.use(
  cors({
    origin: true,
  })
);

app.use(express.json());

app.use("/api/habits", habitRoutes);

app.use("/api/habit-logs", habitLogRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Habit Tracker API Running",
  });
});

export default app;
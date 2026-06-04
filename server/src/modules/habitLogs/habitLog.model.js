import mongoose from "mongoose";

const habitLogSchema = new mongoose.Schema(
  {
    habitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habit",
      required: true,
    },

    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "HabitLog",
  habitLogSchema
);
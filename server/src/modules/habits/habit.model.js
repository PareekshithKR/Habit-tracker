import mongoose from "mongoose";

const HabitSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    color: {
      type: String,
      default: "#6366F1"
    },

    frequency: {
      type: String,
      enum: ["daily", "weekly"],
      default: "daily"
    },

    archived: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Habit", HabitSchema);
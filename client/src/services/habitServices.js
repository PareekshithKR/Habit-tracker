import axios from "axios";

const API_URL = "http://localhost:5000/api/habits";

export async function getHabits() {
  const response = await axios.get(API_URL);
  return response.data;
}

export async function createHabit(habitData) {
  const response = await axios.post(API_URL, habitData);
  return response.data;
}

export async function deleteHabit(id) {
  const response = await axios.delete(
    `${API_URL}/${id}`
  );

  return response.data;
}

export async function completeHabit(habitId) {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  const response = await axios.post(
    "http://localhost:5000/api/habit-logs",
    {
      habitId,
      date: today,
    }
  );

  return response.data;
}

export async function updateHabit(
  id,
  habitData
) {
  const response = await axios.put(
    `${API_URL}/${id}`,
    habitData
  );

  return response.data;
}

export async function getHabitStreak(habitId) {
  const response = await axios.get(
    `http://localhost:5000/api/habit-logs/streak/${habitId}`
  );

  return response.data;
}
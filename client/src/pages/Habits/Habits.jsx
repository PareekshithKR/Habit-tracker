import { useEffect, useState } from "react";
import { getHabits } from "../../services/habitservices";

export default function Habits() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    loadHabits();
  }, []);

  async function loadHabits() {
    try {
      const data = await getHabits();
      setHabits(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-slate-800 mb-2">
        All Habits
      </h1>

      <p className="text-slate-500 mb-8">
        Manage all your habits in one place.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {habits.map((habit) => (
          <div
            key={habit._id}
            className="
              bg-white
              rounded-2xl
              shadow-sm
              border
              border-slate-200
              p-5
            "
          >
            <h3 className="text-xl font-semibold">
              {habit.title}
            </h3>

            <p className="text-slate-500 mt-2">
              Frequency: {habit.frequency}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
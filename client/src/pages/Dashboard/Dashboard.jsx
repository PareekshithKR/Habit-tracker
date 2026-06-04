import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  getHabits,
  createHabit,
  deleteHabit,
  completeHabit,
  updateHabit,
  getHabitStreak,
} from "../../services/habitservices";
import EditHabitModal from "../../components/EditHabitModal";

export default function Dashboard() {
  const { darkMode } = useTheme();
  const [habits, setHabits] = useState([]);
  const [title, setTitle] = useState("");
  const [streaks, setStreaks] = useState({});
  const [isModalOpen, setIsModalOpen] =
  useState(false);
  const [completedToday, setCompletedToday] = useState({});
  const [habitToDelete, setHabitToDelete] =
  useState(null);
  

const [selectedHabit, setSelectedHabit] =
  useState(null);

  async function loadHabits() {
    try {
      const data = await getHabits();

      setHabits(data);

      const streakData = {};
      const completedData = {};

      for (const habit of data) {
        completedData[habit._id] = false;
        try {
          const result = await getHabitStreak(
            habit._id
          );

          streakData[habit._id] =
  result.streak;

completedData[habit._id] =
  result.completedToday;
        } catch {
          streakData[habit._id] = 0;
        }
      }

      setStreaks(streakData);
      setCompletedToday(completedData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadHabits();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      await createHabit({
        title,
        color: "#3B82F6",
        frequency: "daily",
      });

      setTitle("");

      await loadHabits();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteHabit(id);

      await loadHabits();
    } catch (error) {
      console.error(error);
    }
  }

  

async function handleComplete(id) {
  try {
    await completeHabit(id);

    setCompletedToday((prev) => ({
      ...prev,
      [id]: true,
    }));

    await loadHabits();
  } catch (error) {
    console.error(error);
  }
}

  async function handleSaveEdit(
  updatedTitle
) {
  try {
    await updateHabit(
      selectedHabit._id,
      {
        title: updatedTitle,
      }
    );

    setIsModalOpen(false);

    setSelectedHabit(null);

    await loadHabits();
  } catch (error) {
    console.error(error);
  }
}

  return (
  <div
  className={`
    flex-1
    p-8
    min-h-screen
    ${
      darkMode
        ? "bg-slate-900 text-white"
        : "bg-slate-100 text-slate-900"
    }
  `}
>
    <div className="w-full">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Habit Tracker
          </h1>

          <p className="text-slate-500 mt-1">
            Build better habits every day
          </p>
        </div>

        <div
  className={`
    rounded-2xl
    shadow-sm
    p-6
    ${
      darkMode
        ? "bg-slate-800"
        : "bg-white"
    }
  `}
>
          P
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div
  className={`
    rounded-2xl
    shadow-sm
    p-6
    ${
      darkMode
        ? "bg-slate-800"
        : "bg-white"
    }
  `}
>
          <p className="text-slate-500">
            Total Habits
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {habits.length}
          </h2>
        </div>

        <div
  className={`
    rounded-2xl
    shadow-sm
    p-6
    ${
      darkMode
        ? "bg-slate-800"
        : "bg-white"
    }
  `}
>
          <p className="text-slate-500">
            Active Habits
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {habits.length}
          </h2>
        </div>

        <div
  className={`
    rounded-2xl
    shadow-sm
    p-6
    ${
      darkMode
        ? "bg-slate-800"
        : "bg-white"
    }
  `}
>
          <p className="text-slate-500">
            Best Streak
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {Math.max(
              0,
              ...Object.values(streaks)
            )}
          </h2>
        </div>
      </div>

      {/* Add Habit */}
      <div
  className={`
    rounded-2xl
    shadow-sm
    p-6
    ${
      darkMode
        ? "bg-slate-800"
        : "bg-white"
    }
  `}
>
        <form
          onSubmit={handleSubmit}
          className="flex gap-3"
        >
          <input
            type="text"
            placeholder="Enter a new habit..."
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className={`
  flex-1
  rounded-xl
  border
  px-4
  py-3
  ${
    darkMode
      ? "bg-slate-700 border-slate-600 text-white"
      : "bg-white border-slate-300"
  }
`}
          />

          <button
            type="submit"
            className="
              bg-blue-600
              text-white
              px-6
              py-3
              rounded-xl
              hover:bg-blue-700
              transition
            "
          >
            Add Habit
          </button>
        </form>
      </div>

      

      {/* Habits Grid */}
      <div
  className={`
    rounded-2xl
    shadow-sm
    p-6
    ${
      darkMode
        ? "bg-slate-800"
        : "bg-white"
    }
  `}
>
        {habits.map((habit) => (
          <div
            key={habit._id}
            className={`
  rounded-2xl
  p-6
  shadow-sm
  transition
  hover:shadow-md
  ${
    darkMode
      ? "bg-slate-800"
      : "bg-white"
  }
`}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex justify-between items-center">
  <h3 className="text-xl font-bold">
    {habit.title}
  </h3>

  {completedToday[habit._id] && (
    <span
      className="
        bg-green-100
        text-green-700
        px-3
        py-1
        rounded-full
        text-sm
        font-medium
      "
    >
      ✓ Completed
    </span>
  )}
</div>

                <p
  className={
    darkMode
      ? "text-slate-300"
      : "text-slate-500"
  }
>
                  {habit.frequency}
                </p>
              </div>

              <div className="text-orange-500 font-bold">
                🔥 {streaks[habit._id] || 0}
              </div>
              {completedToday[habit._id] && (
  <div
    className="
      inline-flex
      items-center
      gap-1
      mt-3
      px-3
      py-1
      rounded-full
      bg-green-100
      text-green-700
      text-sm
      font-medium
    "
  >
    ✅ Completed Today
  </div>
)}
            </div>

            <div className="mt-6 flex gap-2">
              <button
  disabled={completedToday[habit._id]}
  onClick={() =>
    handleComplete(habit._id)
  }
                className={`
  px-4 py-2 rounded-lg text-white
  ${
    completedToday[habit._id]
      ? "bg-slate-400 cursor-not-allowed"
      : "bg-green-500 hover:bg-green-600"
  }
`}
              >
                Complete
              </button>

              <button
  onClick={() => {
    setSelectedHabit(habit);
    setIsModalOpen(true);
  }}
  className="
    bg-yellow-500
    text-white
    px-4
    py-2
    rounded-lg
    hover:bg-yellow-600
  "
>
  Edit
</button>

             <button
  onClick={() =>
    setHabitToDelete(habit)
  }
  className="
    px-4 py-2
    rounded-xl
    bg-red-500
    text-white
    hover:bg-red-600
    transition
  "
>
  🗑 Delete
</button>
            </div>
          </div>
        ))}
      </div>

    </div>
    <EditHabitModal
  isOpen={isModalOpen}
  habit={selectedHabit}
  onClose={() =>
    setIsModalOpen(false)
  }
  onSave={handleSaveEdit}
/>

{habitToDelete && (
  <div
    className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
    "
  >
    <div
      className={`
        w-full
        max-w-md
        rounded-2xl
        p-6
        shadow-2xl
        ${
          darkMode
            ? "bg-slate-800 text-white"
            : "bg-white text-slate-900"
        }
      `}
    >
      <h2 className="text-2xl font-bold">
        Delete Habit?
      </h2>

      <p className="mt-4">
        Are you sure you want to delete
        <span className="font-semibold">
          {" "}
          {habitToDelete.title}
        </span>
        ?
      </p>

      <p className="mt-2 text-red-500 text-sm">
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() =>
            setHabitToDelete(null)
          }
          className={`
            px-4
            py-2
            rounded-xl
            border
            ${
              darkMode
                ? "border-slate-600 hover:bg-slate-700"
                : "border-slate-300 hover:bg-slate-100"
            }
          `}
        >
          Cancel
        </button>

        <button
          onClick={async () => {
            await handleDelete(
              habitToDelete._id
            );

            setHabitToDelete(null);
          }}
          className="
            px-4
            py-2
            rounded-xl
            bg-red-500
            text-white
            hover:bg-red-600
            transition
          "
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

</div>

);
}
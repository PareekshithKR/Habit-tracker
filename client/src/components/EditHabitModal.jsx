import { useState, useEffect } from "react";

export default function EditHabitModal({
  isOpen,
  habit,
  onClose,
  onSave,
}) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (habit) {
      setTitle(habit.title);
    }
  }, [habit]);

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0
        bg-black/50
        flex items-center justify-center
        z-50
      "
    >
      <div
        className="
          bg-white
          rounded-2xl
          p-6
          w-full
          max-w-md
          shadow-xl
        "
      >
        <h2 className="text-2xl font-bold mb-4">
          Edit Habit
        </h2>

        <input
          type="text"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="
            w-full
            border
            border-slate-300
            rounded-lg
            px-4
            py-2
            mb-6
          "
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              px-4 py-2
              rounded-lg
              bg-slate-200
            "
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSave(title)
            }
            className="
              px-4 py-2
              rounded-lg
              bg-blue-600
              text-white
            "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
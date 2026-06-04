import { useTheme } from "../../context/ThemeContext";

export default function Settings() {
  const { darkMode, toggleTheme } =
    useTheme();

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Settings
      </h1>

      <div
        className="
          bg-white
          p-6
          rounded-xl
          shadow
          max-w-md
        "
      >
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">
              Dark Mode
            </h3>

            <p className="text-slate-500">
              Switch between light and dark theme
            </p>
          </div>

          <button
            onClick={toggleTheme}
            className="
              bg-blue-600
              text-white
              px-4
              py-2
              rounded-lg
            "
          >
            {darkMode ? "ON" : "OFF"}
          </button>
        </div>
      </div>
    </div>
  );
}
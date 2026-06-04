import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

export default function Sidebar() {
  const location = useLocation();
  const { darkMode } = useTheme();

  const links = [
    {
      name: "Dashboard",
      path: "/",
      icon: "📊",
    },
    {
      name: "Habits",
      path: "/habits",
      icon: "✅",
    },
    {
      name: "Settings",
      path: "/settings",
      icon: "⚙️",
    },
  ];

  return (
    <aside
  className={`
    w-64
    min-h-screen
    p-6
    ${
      darkMode
        ? "bg-slate-950 text-white"
        : "bg-white text-slate-900 border-r border-slate-200"
    }
  `}
>

      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold">
          Habit Tracker
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          Build consistency daily
        </p>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
              ${
                location.pathname === link.path
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      </nav>

      <div className="p-5 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
            P
          </div>

          <div>
            <p className="font-medium">
              Pareekshith
            </p>

            <p className="text-xs text-slate-400">
              Habit Builder
            </p>
          </div>
        </div>
      </div>

    </aside>
  );
}
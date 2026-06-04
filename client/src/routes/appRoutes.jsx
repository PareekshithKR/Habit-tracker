import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import Habits from "../pages/Habits/Habits";
import Settings from "../pages/Settings/Settings";

import AppLayout from "../components/layout/AppLayout";

export default function AppRoutes() {
  return (
    <AppLayout>
      <Routes>
        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/habits"
          element={<Habits />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />
      </Routes>
    </AppLayout>
  );
}
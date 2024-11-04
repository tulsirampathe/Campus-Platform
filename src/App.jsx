import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminContestPanel from "./components/Admin/AdminContestPanel";
import AdminContestSetup from "./components/Admin/AdminContestSetup";
import AdminProfile from "./components/Admin/AdminProfile";
import ProtectRoute from "./components/auth/ProtectRoute";
import ContestOverview from "./components/CreateContest/ContestOverview";
import MainCode from "./components/VsCode/MainCode";
import AdminLogin from "./components/Admin/AdminLogin";

let user = true;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectRoute user={user} />}>
          <Route path="/" element={<AdminProfile />} />
          <Route path="/admin-contest-setup" element={<AdminContestSetup />} />
          <Route path="/admin-contest-panel" element={<AdminContestPanel />} />
          <Route path="/contest-overview" element={<ContestOverview />} />
          <Route path="/solve" element={<MainCode />} />
        </Route>

        <Route
          path="/login"
          element={
            <ProtectRoute user={!user} redirect="/">
              <AdminLogin />
            </ProtectRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

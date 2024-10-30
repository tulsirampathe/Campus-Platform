import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ContestOverview from "./components/CreateContest/ContestOverview";
import AdminContestPanel from "./components/Admin/AdminContestPanel";
import MainCode from "./components/VsCode/MainCode";
import AdminProfile from "./components/Admin/AdminProfile";
import AdminContestSetup from "./components/Admin/AdminContestSetup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminProfile />} />
        <Route path="/admin-contest-setup" element={<AdminContestSetup />} />
        <Route path="/admin-contest-panel" element={<AdminContestPanel />} />
        <Route path="/contest-overview" element={<ContestOverview />} />
        <Route path="/solve" element={<MainCode />} />
      </Routes>
    </Router>
  );
}

export default App;

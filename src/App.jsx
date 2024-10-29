import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ContestOverview from "./components/CreateContest/ContestOverview";
import AdminContestPanel from "./components/CreateContest/AdminContestPanel";
import MainCode from "./components/VsCode/MainCode";
import AdminContestSetup from "./components/CreateContest/AdminContestSetup";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<AdminContestSetup />} />
        <Route path="/admin-contest-panel" element={<AdminContestPanel />} />
        <Route path="/contest-overview" element={<ContestOverview />} />
        <Route path="/solve" element={<MainCode />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ContestOverview from "./components/ContestOverview";
import AdminContestPanel from "./components/CreateContest/AdminContestPanel";
import MainCode from "./components/VsCode/MainCode";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminContestPanel />} />
        <Route path="/contest-overview" element={<ContestOverview />} />
        <Route path="/solve" element={<MainCode />} />
      </Routes>
    </Router>
  );
}

export default App;

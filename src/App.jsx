import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

// Components
import NotProtectedLayout from "./components/auth/NotProtectedLayout";
import ProtectRoute from "./components/auth/ProtectRoute";
import UserProtectedLayout from "./components/auth/userProtectedLayout";
import ChallengeOverviewPage from "./components/CreateChallenge/ChallengeOverviewPage";
import About from "./components/homepage/About";
import Body from "./components/homepage/Body";
import LoadingSpinner from "./components/LoadingSpinner";
import UserLogin from "./components/user/UserLogin";
import ParticipantChallengeOverviewPage from "./components/userChallengePages/ParticipantChallengeOverviewPage";
import MainCode from "./components/VsCode/MainCode";

// Pages
import AddQuestion from "./pages/host/AddQuestion";
import ChallengeSetup from "./pages/host/ChallengeSetup";
import HostDashboard from "./pages/host/HostDashboard";
import AdminLogin from "./pages/host/HostLogin";
import ProtectedLayout from "./pages/host/ProtectedLayout";

// Redux Actions
import {
  hostExists,
  hostLoading,
  hostNotExists,
  userExists,
  userLoading,
  userNotExists,
} from "./redux/reducers/auth";

// Config
import { config, server } from "./constants/config";

function App() {
  const { host, loading, user, challengeProgress } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  // Check Host Authentication
  useEffect(() => {
    dispatch(hostLoading());
    axios
      .get(`${server}/admin/profile`, config)
      .then(({ data }) => {
        const { success, host } = data;
        if (success) {
          dispatch(hostExists(host));
        } else {
          dispatch(hostNotExists());
        }
      })
      .catch(() => {
        dispatch(hostNotExists());
      });
  }, [dispatch]);

  // Check User Authentication
  useEffect(() => {
    dispatch(userLoading());
    axios
      .get(`${server}/user/profile`, config)
      .then(({ data }) => {
        const { success, user } = data;
        if (success) {
          dispatch(userExists(user));
        } else {
          dispatch(userNotExists());
        }
      })
      .catch(() => {
        dispatch(userNotExists());
      });
  }, [dispatch]);

  // Show Loading Spinner
  if (loading.host || loading.user) {
    return <LoadingSpinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Host Protected Routes */}
        <Route element={<ProtectRoute user={host} />}>
          <Route element={<ProtectedLayout />}>
            <Route path="/host-dashboard" element={<HostDashboard />} />
            <Route path="/challenge-setup" element={<ChallengeSetup />} />
            <Route path="/overview" element={<ChallengeOverviewPage />} />
          </Route>
          <Route path="/add-question" element={<AddQuestion />} />
          <Route path="/code-editor" element={<MainCode />} />
        </Route>

        {/* Public Routes */}
        <Route element={<ProtectRoute user={!host} redirect="/host-dashboard" />}>
          <Route element={<NotProtectedLayout />}>
            <Route path="/" element={<Body />} />
            <Route path="/about" element={<About />} />
            <Route path="/host-login" element={<AdminLogin />} />
            <Route path="/user-login" element={<UserLogin />} />
          </Route>
        </Route>

        {/* Participant Protected Routes */}
        <Route
          element={
            <ProtectRoute
              user={
                challengeProgress
                  ? challengeProgress.status !== "ended" && user
                  : user
              }
            />
          }
        >
          <Route element={<UserProtectedLayout />}>
            <Route
              path="/challenge-page"
              element={<ParticipantChallengeOverviewPage />}
            />
          </Route>
          <Route path="/editor" element={<MainCode />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

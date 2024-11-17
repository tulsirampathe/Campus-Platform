import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotProtectedLayout from "./components/auth/NotProtectedLayout";
import ProtectRoute from "./components/auth/ProtectRoute";
import About from "./components/homepage/About";
import Body from "./components/homepage/Body";
import UserLogin from "./components/user/UserLogin";
import ParticipantChallengeOverviewPage from "./components/userChallengePages/ParticipantChallengeOverviewPage";
import MainCode from "./components/VsCode/MainCode";
import { config, server } from "./constants/config";
import AddQuestion from "./pages/host/AddQuestion";
import ChallengeSetup from "./pages/host/ChallengeSetup";
import HostDashboard from "./pages/host/HostDashboard";
import AdminLogin from "./pages/host/HostLogin";
import ProtectedLayout from "./pages/host/ProtectedLayout";
import {
  hostExists,
  hostLoading,
  hostNotExists,
  userExists,
  userLoading,
  userNotExists,
} from "./redux/reducers/auth";
import ChallengeOverviewPage from "./components/CreateChallenge/ChallengeOverviewPage";
import LoadingSpinner from "./components/LoadingSpinner";
import HomeNavbar from "./components/homepage/HomeNavbar";
import UserProtectedLayout from "./components/auth/userProtectedLayout";

function App() {
  const { host, loading, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

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

  if (loading.host || loading.user) {
    return <LoadingSpinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Host Routes */}
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
        <Route
          element={<ProtectRoute user={!host} redirect="/host-dashboard" />}
        >
          <Route element={<NotProtectedLayout />}>
            <Route path="/" element={<Body />} />
            <Route path="/about" element={<About />} />
            <Route path="/host-login" element={<AdminLogin />} />
            <Route path="/user-login" element={<UserLogin />} />
          </Route>
        </Route>

        {/* Participant Routes with HomeNavbar */}
        <Route element={<ProtectRoute user={user} />}>
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

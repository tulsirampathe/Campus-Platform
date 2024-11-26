import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  host: null,
  user: null,
  challengeID: null,
  questionID: null,
  questionData: null,
  challenge: null,
  challengeProgress: null,
  loading: {
    host: false,
    user: false,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hostLoading: (state) => {
      state.loading.host = true;
    },
    hostExists: (state, action) => {
      state.host = action.payload;
      state.loading.host = false;
    },
    hostNotExists: (state) => {
      state.host = null;
      state.loading.host = false;
    },
    userLoading: (state) => {
      state.loading.user = true;
    },
    userExists: (state, action) => {
      state.user = action.payload;
      state.loading.user = false;
    },
    userNotExists: (state) => {
      state.user = null;
      state.loading.user = false;
    },
    setChallengeID: (state, action) => {
      state.challengeID = action.payload;
    },
    setQuestionID: (state, action) => {
      state.questionID = action.payload;
    },
    setQuestionData: (state, action) => {
      state.questionData = action.payload;
    },
    setChallenge: (state, action) => {
      state.challenge = action.payload;
    },
    setChallengeProgress: (state, action) => {
      state.challengeProgress = action.payload;
    },
  },
});

export default authSlice;

export const {
  hostLoading,
  hostExists,
  hostNotExists,
  userLoading,
  userExists,
  userNotExists,
  setChallengeID,
  setQuestionID,
  setQuestionData,
  setChallenge,
  setChallengeProgress,
} = authSlice.actions;

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import api from "./api/api";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore specific actions or paths if needed
        ignoredActions: [
          // Example: If your API or auth actions are causing issues, ignore them here
          "api/executeMutation/pending",
        ],
        ignoredPaths: ["auth.questionID"], // You can also ignore specific paths in the state
      },
    }).concat(api.middleware),
});

export default store;

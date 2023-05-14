import { configureStore } from "@reduxjs/toolkit";
import studyReducer from "../features/study/studySlice";
import { studyFormApi } from "../services/studyFormApi";

export const store = configureStore({
  reducer: {
    study: studyReducer,
    [studyFormApi.reducerPath]: studyFormApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studyFormApi.middleware),
});

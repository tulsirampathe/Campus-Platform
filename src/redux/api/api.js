import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/` }),

  tagTypes: [
    "hostProfile",
    "Challenges",
    "Challenge",
    "Questions",
    "Question",
    "TestCases",
    "Submissions",
    "SubmitCode",
    "Progress",
    "Leaderboard",
  ],

  endpoints: (builder) => ({
    updateHost: builder.mutation({
      query: (data) => ({
        url: "/admin/profile",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    // Get list of challenges
    myChallenges: builder.query({
      query: () => ({
        url: "admin/challenges",
        credentials: "include",
      }),
      providesTags: ["Challenges"], // Provides this tag for cache invalidation
    }),

    // Create a new challenge
    createChallenge: builder.mutation({
      query: (data) => ({
        url: "challenge/create",
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Challenges"], // Invalidates the list of challenges
    }),

    // Fetch challenge data based on the challenge ID
    challengeData: builder.query({
      query: (id) => ({
        url: `challenge/${id}`,
        credentials: "include",
      }),
      providesTags: ["Challenge"],
    }),

    // Edit challenge data
    editChallengeData: builder.mutation({
      query: ({ id, data }) => ({
        url: `challenge/${id}/update`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Challenge", "Challenges"],
    }),

    // Delete a challenge
    deleteChallenge: builder.mutation({
      query: (id) => ({
        url: `admin/challenge/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Challenges"], // Invalidates the challenges list after deletion
    }),

    getQuestions: builder.query({
      query: () => ({
        url: "question/all",
        credentials: "include",
      }),
      providesTags: ["Questions"],
    }),

    addQuestion: builder.mutation({
      query: ({ challengeID, questionID }) => ({
        url: `challenge/${challengeID}/add-question`,
        method: "PUT",
        body: questionID,
        credentials: "include",
      }),
      invalidatesTags: ["Challenge", "Challenges"],
    }),

    removeQuestion: builder.mutation({
      query: ({ id, data }) => ({
        url: `challenge/${id}/remove-question`,
        method: "DELETE",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Challenges", "Challenge"],
    }),

    questionDetails: builder.query({
      query: (id) => ({
        url: `question/detail/${id}`,
        credentials: "include",
      }),
      providesTags: ["Question"],
    }),

    updateQuestion: builder.mutation({
      query: ({ id, data }) => ({
        url: `/question/update/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Challenge", "Question"],
    }),

    newQuestion: builder.mutation({
      query: (data) => ({
        url: `/question/create`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Questions", "Question"],
    }),

    getTestCases: builder.query({
      query: (id) => ({
        url: `testCase/questions/${id}/testcases`,
        credentials: "include",
      }),
      providesTags: ["TestCases"],
    }),

    addTestCase: builder.mutation({
      query: ({ id, data }) => ({
        url: `testCase/questions/${id}/testcases`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["TestCases", "Challenge"],
    }),

    updateTestCase: builder.mutation({
      query: ({ id, data }) => ({
        url: `testCase/testcases/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["TestCases"],
    }),

    deleteTestCase: builder.mutation({
      query: (id) => ({
        url: `testCase/testcases/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["TestCases", "Challenge"],
    }),

    joinChallenge: builder.mutation({
      query: (data) => ({
        url: "challenge/join",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    endChallenge: builder.mutation({
      query: (data) => ({
        url: "challenge/end",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Progress"],
    }),

    getSubmissions: builder.query({
      query: ({ challengeID, questionID }) => ({
        url: `submission/challenge/${challengeID}/question/${questionID}`,
        credentials: "include",
      }),
      providesTags: ["Submissions"],
    }),

    submitCode: builder.mutation({
      query: (data) => ({
        url: "submission/",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Submissions", "Progress"],
    }),

    getProgress: builder.query({
      query: (id) => ({
        url: `challenge/progress/${id}`,
        credentials: "include",
      }),
      providesTags: ["Progress"],
    }),

    calculateLeaderboard: builder.mutation({
      query: (id) => ({
        url: `challenge/leaderboard/${id}`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Challenge"],
    }),

    getLeaderboard: builder.query({
      query: (id) => ({
        url: `challenge/leaderboard/${id}`,
        credentials: "include",
      }),
      providesTags: ["Leaderboard"],
    }),
  }),
});

export default api;

// Export hooks to be used in components
export const {
  useUpdateHostMutation,
  useMyChallengesQuery,
  useCreateChallengeMutation,
  useChallengeDataQuery,
  useEditChallengeDataMutation,
  useDeleteChallengeMutation,
  useGetQuestionsQuery,
  useAddQuestionMutation,
  useRemoveQuestionMutation,
  useQuestionDetailsQuery,
  useUpdateQuestionMutation,
  useNewQuestionMutation,
  useGetTestCasesQuery,
  useAddTestCaseMutation,
  useUpdateTestCaseMutation,
  useDeleteTestCaseMutation,
  useJoinChallengeMutation,
  useEndChallengeMutation,
  useGetSubmissionsQuery,
  useSubmitCodeMutation,
  useGetProgressQuery,
  useCalculateLeaderboardMutation,
  useGetLeaderboardQuery,
} = api;

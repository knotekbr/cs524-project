import { baseApi } from "~api";

import { allPromptsEndpoint } from "./answer-prompts.defs";

const { get: getAllPrompts } = allPromptsEndpoint;

export const answerPromptsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPrompts: getAllPrompts.builder(build)({
      query: getAllPrompts.defaultQuery,
      transformResponse: getAllPrompts.transformer,
    }),
    uploadCsv: build.mutation({
      query: ({ file }: { file: File }) => {
        const body = new FormData();
        body.append("Content-Type", file.type);
        body.append("file", file);

        return {
          url: "answer-prompts/upload",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useGetAllPromptsQuery, useUploadCsvMutation } = answerPromptsApi;

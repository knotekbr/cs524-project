import { baseApi } from "~api";

export const answerPromptsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
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

export const { useUploadCsvMutation } = answerPromptsApi;

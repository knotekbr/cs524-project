import { defineEndpoint } from "~api/helpers/defineEndpoint";

import { AnswerPromptDto, ApiResponse } from "~types";

export const allPromptsEndpoint = defineEndpoint({
  url: () => "answer-prompts",
  transformer: (data: ApiResponse<AnswerPromptDto[]>) => data,
  methods: {
    get: {},
  },
});

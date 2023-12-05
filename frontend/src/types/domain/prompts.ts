export type AnswerPromptDto = {
  id: number;
  difficulty: number;
  prompt: string;
  categoryId: number;
  category: {
    categoryName: string;
  };
  correctResponse: string;
  otherResponses: string[];
};

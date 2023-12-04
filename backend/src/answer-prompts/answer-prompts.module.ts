import { Module } from "@nestjs/common";
import { AnswerPromptsService } from "./answer-prompts.service";

@Module({
  providers: [AnswerPromptsService],
  exports: [AnswerPromptsService],
})
export class AnswerPromptsModule {}

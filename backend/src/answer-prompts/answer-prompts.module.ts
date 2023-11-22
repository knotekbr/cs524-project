import { Module } from "@nestjs/common";
import { AnswerPromptsService } from "./answer-prompts.service";

@Module({
  providers: [AnswerPromptsService],
})
export class AnswerPromptsModule {}

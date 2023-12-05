import { Module } from "@nestjs/common";
import { AnswerPromptsService } from "./answer-prompts.service";
import { AnswerPromptsController } from "./answer-prompts.controller";
import { AnswerCategoriesModule } from "src/answer-categories/answer-categories.module";

@Module({
  imports: [AnswerCategoriesModule],
  providers: [AnswerPromptsService],
  controllers: [AnswerPromptsController],
  exports: [AnswerPromptsService],
})
export class AnswerPromptsModule {}

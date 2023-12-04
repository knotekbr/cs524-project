import { Module } from "@nestjs/common";
import { AnswerCategoriesService } from "./answer-categories.service";

@Module({
  providers: [AnswerCategoriesService],
  exports: [AnswerCategoriesService],
})
export class AnswerCategoriesModule {}

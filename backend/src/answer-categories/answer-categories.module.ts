import { Module } from "@nestjs/common";
import { AnswerCategoriesService } from "./answer-categories.service";

@Module({
  providers: [AnswerCategoriesService],
})
export class AnswerCategoriesModule {}

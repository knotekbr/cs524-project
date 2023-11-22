import { Module } from "@nestjs/common";
import { AdminAnswerPromptsController } from "./answer-prompts.controller";

@Module({
  controllers: [AdminAnswerPromptsController],
})
export class AdminAnswerPromptsModule {}

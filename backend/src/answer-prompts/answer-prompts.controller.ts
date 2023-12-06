import { Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Readable } from "stream";
import * as papa from "papaparse";
import { ParsedPrompt } from "./interfaces/parsedPrompt";
import { Auth } from "src/common/decorators/auth.decorator";
import { Role } from "src/common/enums/role.enum";
import { AnswerPromptsService } from "./answer-prompts.service";
import { AnswerCategoriesService } from "src/answer-categories/answer-categories.service";
import { AnswerCategory } from "@prisma/client";

@Controller("answer-prompts")
@Auth(Role.Admin)
export class AnswerPromptsController {
  constructor(
    private answerPromptsService: AnswerPromptsService,
    private answerCategoriesService: AnswerCategoriesService
  ) {}

  @Get()
  async getAllPrompts() {
    return this.answerPromptsService.findMany({});
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file", {}))
  async uploadCsv(@UploadedFile() file: Express.Multer.File) {
    const fileStream = Readable.from(file.buffer);
    papa.parse(fileStream, {
      header: true,
      worker: true,
      delimiter: ",",
      dynamicTyping: (field) => field === "Difficulty",
      complete: async (results: papa.ParseResult<ParsedPrompt>) => {
        const { data } = results;
        const categories: Record<string, AnswerCategory> = {};

        for (const parsed of data) {
          let category: AnswerCategory;

          if (parsed.Category in categories) {
            category = categories[parsed.Category];
          } else {
            category = await this.answerCategoriesService.create({
              categoryName: parsed.Category,
            });
            categories[parsed.Category] = category;
          }

          await this.answerPromptsService.create({
            category: { connect: { id: category.id } },
            correctResponse: parsed["Correct Answer"],
            difficulty: parsed.Difficulty,
            prompt: parsed.Question,
            otherResponses: [parsed["Wrong Answer 1"], parsed["Wrong Answer 2"], parsed["Wrong Answer 3"]],
          });
        }

        fileStream.destroy();
      },
    });
  }
}

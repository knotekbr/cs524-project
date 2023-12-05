import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AnswerPrompt, Prisma } from "@prisma/client";

@Injectable()
export class AnswerPromptsService {
  constructor(private prisma: PrismaService) {}

  async findOne(answerPromptWhereUniqueInput: Prisma.AnswerPromptWhereUniqueInput): Promise<AnswerPrompt | null> {
    return this.prisma.answerPrompt.findUnique({
      where: answerPromptWhereUniqueInput,
      include: {
        category: {
          select: {
            categoryName: true,
          },
        },
      },
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AnswerPromptWhereUniqueInput;
    where?: Prisma.AnswerPromptWhereInput;
    orderBy?: Prisma.AnswerPromptOrderByWithRelationInput;
  }): Promise<AnswerPrompt[]> {
    const { cursor, orderBy, skip, take, where } = params;
    return this.prisma.answerPrompt.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        category: {
          select: {
            categoryName: true,
          },
        },
      },
    });
  }

  async create(data: Prisma.AnswerPromptCreateInput): Promise<AnswerPrompt> {
    return this.prisma.answerPrompt.create({
      data,
      include: {
        category: {
          select: {
            categoryName: true,
          },
        },
      },
    });
  }

  async update(params: {
    where: Prisma.AnswerPromptWhereUniqueInput;
    data: Prisma.AnswerPromptUpdateInput;
  }): Promise<AnswerPrompt> {
    const { data, where } = params;
    return this.prisma.answerPrompt.update({
      data,
      where,
      include: {
        category: {
          select: {
            categoryName: true,
          },
        },
      },
    });
  }

  async delete(where: Prisma.AnswerPromptWhereUniqueInput): Promise<AnswerPrompt> {
    return this.prisma.answerPrompt.delete({
      where,
      include: {
        category: {
          select: {
            categoryName: true,
          },
        },
      },
    });
  }
}

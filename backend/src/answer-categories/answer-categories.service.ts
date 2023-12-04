import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AnswerCategory, Prisma } from "@prisma/client";

@Injectable()
export class AnswerCategoriesService {
  constructor(private prisma: PrismaService) {}

  async findOne(answerCategoryWhereUniqueInput: Prisma.AnswerCategoryWhereUniqueInput): Promise<AnswerCategory | null> {
    return this.prisma.answerCategory.findUnique({
      where: answerCategoryWhereUniqueInput,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AnswerCategoryWhereUniqueInput;
    where?: Prisma.AnswerCategoryWhereInput;
    orderBy?: Prisma.AnswerCategoryOrderByWithRelationInput;
  }): Promise<AnswerCategory[]> {
    const { cursor, orderBy, skip, take, where } = params;
    return this.prisma.answerCategory.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.AnswerCategoryCreateInput): Promise<AnswerCategory> {
    return this.prisma.answerCategory.create({ data });
  }

  async update(params: {
    where: Prisma.AnswerCategoryWhereUniqueInput;
    data: Prisma.AnswerCategoryUpdateInput;
  }): Promise<AnswerCategory> {
    const { data, where } = params;
    return this.prisma.answerCategory.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.AnswerCategoryWhereUniqueInput): Promise<AnswerCategory> {
    return this.prisma.answerCategory.delete({ where });
  }
}

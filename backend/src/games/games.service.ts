import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Game, Prisma } from "@prisma/client";

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) {}

  async findOne(gameWhereUniqueInput: Prisma.GameWhereUniqueInput): Promise<Game | null> {
    return this.prisma.game.findUnique({
      where: gameWhereUniqueInput,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.GameWhereUniqueInput;
    where?: Prisma.GameWhereInput;
    orderBy?: Prisma.GameOrderByWithRelationInput;
  }): Promise<Game[]> {
    const { cursor, orderBy, skip, take, where } = params;
    return this.prisma.game.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.GameCreateInput): Promise<Game> {
    return this.prisma.game.create({ data });
  }

  async update(params: { where: Prisma.GameWhereUniqueInput; data: Prisma.GameUpdateInput }): Promise<Game> {
    const { data, where } = params;
    return this.prisma.game.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.GameWhereUniqueInput): Promise<Game> {
    return this.prisma.game.delete({ where });
  }
}

import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Game, Prisma } from "@prisma/client";

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) {}

  async findOne(gameWhereUniqueInput: Prisma.GameWhereUniqueInput): Promise<Game | null> {
    return this.prisma.game.findUnique({
      where: gameWhereUniqueInput,
      include: {
        createdBy: {
          select: { nickname: true },
        },
      },
    });
  }

  async findOnePlayable(gameId: number, userId: number): Promise<Game | null> {
    return this.findOne({
      id: gameId,
      status: { not: "ended" },
      players: {
        some: {
          userId,
        },
      },
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
      include: {
        createdBy: {
          select: { nickname: true },
        },
      },
    });
  }

  async create(data: Prisma.GameCreateInput): Promise<Game> {
    return this.prisma.game.create({
      data,
      include: {
        createdBy: {
          select: { nickname: true },
        },
      },
    });
  }

  async update(params: { where: Prisma.GameWhereUniqueInput; data: Prisma.GameUpdateInput }): Promise<Game> {
    const { data, where } = params;
    return this.prisma.game.update({
      data,
      where,
      include: {
        createdBy: {
          select: { nickname: true },
        },
      },
    });
  }

  async delete(where: Prisma.GameWhereUniqueInput): Promise<Game> {
    return this.prisma.game.delete({
      where,
      include: {
        createdBy: {
          select: { nickname: true },
        },
      },
    });
  }
}

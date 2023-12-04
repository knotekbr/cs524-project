import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { GamePlayer, Prisma } from "@prisma/client";

@Injectable()
export class GamePlayersService {
  constructor(private prisma: PrismaService) {}

  async findOne(gamePlayerWhereUniqueInput: Prisma.GamePlayerWhereUniqueInput): Promise<GamePlayer | null> {
    return this.prisma.gamePlayer.findUnique({
      where: gamePlayerWhereUniqueInput,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.GamePlayerWhereUniqueInput;
    where?: Prisma.GamePlayerWhereInput;
    orderBy?: Prisma.GamePlayerOrderByWithRelationInput;
  }): Promise<GamePlayer[]> {
    const { cursor, orderBy, skip, take, where } = params;
    return this.prisma.gamePlayer.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.GamePlayerCreateInput): Promise<GamePlayer> {
    return this.prisma.gamePlayer.create({ data });
  }

  async update(params: {
    where: Prisma.GamePlayerWhereUniqueInput;
    data: Prisma.GamePlayerUpdateInput;
  }): Promise<GamePlayer> {
    const { data, where } = params;
    return this.prisma.gamePlayer.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.GamePlayerWhereUniqueInput): Promise<GamePlayer> {
    return this.prisma.gamePlayer.delete({ where });
  }
}

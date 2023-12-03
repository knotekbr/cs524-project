import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { GameInvite, Prisma } from "@prisma/client";

@Injectable()
export class GameInvitesService {
  constructor(private prisma: PrismaService) {}

  async findOne(gameInviteWhereUniqueInput: Prisma.GameInviteWhereUniqueInput): Promise<GameInvite | null> {
    return this.prisma.gameInvite.findUnique({
      where: gameInviteWhereUniqueInput,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.GameInviteWhereUniqueInput;
    where?: Prisma.GameInviteWhereInput;
    orderBy?: Prisma.GameInviteOrderByWithRelationInput;
  }): Promise<GameInvite[]> {
    const { cursor, orderBy, skip, take, where } = params;
    return this.prisma.gameInvite.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        game: {
          include: {
            createdBy: {
              select: {
                nickname: true,
              },
            },
          },
        },
      },
    });
  }

  async create(data: Prisma.GameInviteCreateInput): Promise<GameInvite> {
    return this.prisma.gameInvite.create({ data });
  }

  async update(params: {
    where: Prisma.GameInviteWhereUniqueInput;
    data: Prisma.GameInviteUpdateInput;
  }): Promise<GameInvite> {
    const { data, where } = params;
    return this.prisma.gameInvite.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.GameInviteWhereUniqueInput): Promise<GameInvite> {
    return this.prisma.gameInvite.delete({ where });
  }
}

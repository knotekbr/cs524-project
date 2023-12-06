import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { GameEvent, Prisma } from "@prisma/client";

@Injectable()
export class GameEventsService {
  constructor(private prisma: PrismaService) {}

  async findOne(gameEventWhereUniqueInput: Prisma.GameEventWhereUniqueInput): Promise<GameEvent | null> {
    return this.prisma.gameEvent.findUnique({
      where: gameEventWhereUniqueInput,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.GameEventWhereUniqueInput;
    where?: Prisma.GameEventWhereInput;
    orderBy?: Prisma.GameEventOrderByWithRelationInput;
  }): Promise<GameEvent[]> {
    const { cursor, orderBy, skip, take, where } = params;
    return this.prisma.gameEvent.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        associatedPlayer: {
          select: {
            user: {
              select: {
                nickname: true,
              },
            },
          },
        },
      },
    });
  }

  async create(data: Prisma.GameEventCreateInput): Promise<GameEvent> {
    return this.prisma.gameEvent.create({ data });
  }

  async update(params: {
    where: Prisma.GameEventWhereUniqueInput;
    data: Prisma.GameEventUpdateInput;
  }): Promise<GameEvent> {
    const { data, where } = params;
    return this.prisma.gameEvent.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.GameEventWhereUniqueInput): Promise<GameEvent> {
    return this.prisma.gameEvent.delete({ where });
  }
}

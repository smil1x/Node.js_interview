import { Injectable } from '@nestjs/common';
import { CreateObjectDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ObjectService {
  constructor(private prismaService: PrismaService) {}

  async addObject(dto: CreateObjectDto) {
    return this.prismaService.object.create({
      data: { ...dto },
    });
  }

  async getObjectById(objectId: string) {
    return this.prismaService.object.findUnique({
      where: { objectId },
    });
  }

  async getObjects(page: number, pageSize: number) {
    //example transaction
    const [objects, totalObjects] = await this.prismaService.$transaction([
      this.prismaService.object.findMany({
        skip: Number((page - 1) * pageSize),
        take: Number(pageSize),
      }),
      this.prismaService.object.count(),
    ]);
    return { data: [...objects], totalObjects };
  }

  async removeObject(objectId: string) {
    return this.prismaService.object.delete({
      where: { objectId },
    });
  }

  async updateObject(objectId: string, dto: CreateObjectDto) {
    return this.prismaService.object.update({
      where: { objectId },
      data: { ...dto, updatedAt: new Date() },
    });
  }
}

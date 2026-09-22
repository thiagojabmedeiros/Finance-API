import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dtos';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}
    async createUser(dto: CreateUserDto) {
        const user = await this.prisma.user.create({
            data: {
                username: dto.username,
                email: dto.email,
                password: dto.password
            },
            select: {
                id: true,
                username: true,
                createdAt: true
            }
        })

        return user
    }
}

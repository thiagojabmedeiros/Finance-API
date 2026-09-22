import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dtos';
import { Prisma } from '../generated/prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}
    async createUser(dto: CreateUserDto) {
        try {
            return await this.prisma.user.create({ 
                data: {
                    email: dto.email,
                    username: dto.username,
                    password: dto.password
                },
                select: {
                    id: true,
                    role: true,
                    username: true,
                    createdAt: true
                }
            })
        } catch(error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new ConflictException("This e-mail has been already used.")
                }
            }
            throw error
        }
    }
}

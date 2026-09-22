import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dtos';
import { Prisma } from '../generated/prisma/client';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}
    async findAll() {
        const users = await this.prisma.user.findMany({
            select: {
                username: true,
                role: true
            }
        })
        if (users.length === 0) {
            throw new NotFoundException("List of users is empty.")
        }
        return users
    }
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
    async updateUser(id: string, dto: UpdateUserDto) {
        try {
            return await this.prisma.user.update({
                where: {
                    id: id
                },
                data: dto,
                select: {
                    id: true,
                    role: true,
                    email: true,
                    username: true,
                    updatedAt: true
                }
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new ConflictException("This email has been already used.")
                }
                if (error.code === "P2025") {
                    throw new NotFoundException("User not found")
                }
            }
        }
    }
}

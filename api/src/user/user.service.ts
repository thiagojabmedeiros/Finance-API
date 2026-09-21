import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}
    async createUser(username: string, email: string, password: string) {
        const user = await this.prisma.user.create({
            data: {
                username: username,
                email: email,
                password: password
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

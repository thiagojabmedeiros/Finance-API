import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos';
import { UpdateUserDto } from './dtos/updateUser.dto';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get()
    list() {
        return this.userService.findAll()
    }

    @Get(':id')
    listOne(@Param('id') id: string) {
        return this.userService.findOne(id)
    }

    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.userService.createUser(dto)
    }

    @Patch(':id')
    update(@Param("id") id: string, @Body() dto: UpdateUserDto) {
        return this.userService.updateUser(id, dto)
    }
}

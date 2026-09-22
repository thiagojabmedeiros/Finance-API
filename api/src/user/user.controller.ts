import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dtos';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post()
    create(@Body() userDto: UserDto) {
        return this.userService.createUser(userDto.username, userDto.email, userDto.password)
    }
}

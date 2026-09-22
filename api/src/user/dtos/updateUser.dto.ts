import { IsEmail, IsEnum, IsString, MaxLength, MinLength } from "class-validator"
import { Role } from "../../generated/prisma/enums"

export class UpdateUserDto {
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    username: string

    @IsEmail()
    email: string

    @IsString()
    @MinLength(8)
    @MaxLength(25)
    password: string

    @IsEnum(Role)
    role: string
}
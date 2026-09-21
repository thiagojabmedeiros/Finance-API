import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class UserDto {
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    username: string

    @IsEmail()
    email: string

    @IsString()
    @MinLength(6)
    @MaxLength(25)
    password: string
}
import { IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength } from "class-validator"
import { Role } from "../../generated/prisma/enums"
import { PartialType } from "@nestjs/mapped-types"
import { CreateUserDto } from "./createUser.dto"


export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsEnum(Role)
    @IsOptional()
    role: Role
}
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ERole } from 'src/user/domain/enum/role.enum';

export class UserDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(ERole)
  role: ERole;
}

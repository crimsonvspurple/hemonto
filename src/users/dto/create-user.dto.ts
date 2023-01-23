import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsEmail()
  username: string;
  @IsStrongPassword({ minLength: 16, minSymbols: 0 }) // may switch to zxcvbn later
  password: string;
}

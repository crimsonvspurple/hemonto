import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @IsEmail()
  username: string;
  @IsStrongPassword({ minLength: 16, minSymbols: 0 })
  password: string;
}

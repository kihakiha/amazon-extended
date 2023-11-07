import { IsEmail, IsString, MinLength } from "class-validator";

export class AuthDto {

  @IsEmail({}, {
    message: "Введите почту"
  })
  email: string;

  @MinLength(6, {
    message: "Пароль должен содержать, как минимум, 6 символов"
  })
  @IsString( {
    message: "Введите пароль"
  })
  password: string;

}
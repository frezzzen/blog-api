import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LogInDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;
}

export default LogInDto;

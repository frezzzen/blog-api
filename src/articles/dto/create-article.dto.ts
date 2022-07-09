import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  @MinLength(10)
  title: string;

  @IsNotEmpty()
  topic: number;

  @IsNotEmpty()
  mainImage: string;

  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  shortBody: string;
}

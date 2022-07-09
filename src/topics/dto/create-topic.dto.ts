import { IsNotEmpty } from 'class-validator';

export class CreateTopicDto {
  @IsNotEmpty()
  title: string;
}

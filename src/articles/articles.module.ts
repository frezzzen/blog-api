import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TopicsModule } from '../topics/topics.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../users/entity/user.entity';
import { Article } from './entities/article.entity';

@Module({
  imports: [TopicsModule, TypeOrmModule.forFeature([Article])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}

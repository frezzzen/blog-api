import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TopicsService } from '../topics/topics.service';
import User from '../users/entity/user.entity';
import { Topic } from '../topics/entities/topic.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly topicService: TopicsService,
  ) {}
  async create(createArticleDto: CreateArticleDto, user: User) {
    const topic = await this.topicService.findOne(createArticleDto.topic);
    const minRead = ArticlesService.calculateReadRate(createArticleDto.body);
    const article = this.articleRepository.create({
      ...createArticleDto,
      topic,
      user,
      minRead,
    });
    await this.articleRepository.save(article);
    return HttpStatus.OK;
  }

  findAll() {
    return this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.topic', 'topic')
      .leftJoinAndSelect('article.user', 'user')
      .select([
        'article.id',
        'article.title',
        'article.shortBody',
        'article.minRead',
        'article.mainImage',
        'topic.id',
        'topic.title',
        'user.id',
        'user.username',
        'user.avatar',
      ])
      .getMany();
  }

  findOne(id: number) {
    return this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.topic', 'topic')
      .select(['article', 'topic.id', 'topic.title'])
      .where('article.id = :id', { id })
      .getOne();
  }

  async update(id: number, updateArticleDto: UpdateArticleDto, user) {
    await this.checkUser(id, user);
    const topic = await this.topicService.findOne(updateArticleDto.topic);
    return this.articleRepository.update(id, {
      ...updateArticleDto,
      topic,
    });
  }

  async remove(id: number, user: User) {
    console.log(id, user);
    await this.checkUser(id, user);
    return this.articleRepository.delete(id);
  }

  async checkUser(id: number, user: User) {
    const article = await this.articleRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });
    if (article.user.id !== user.id)
      throw new HttpException(
        'You have no rights to delete this article',
        HttpStatus.UNAUTHORIZED,
      );
  }

  private static calculateReadRate(string: string): string {
    const minutes = string.replace(/<[^>]*>?/gm, '').split(' ').length / 238;
    return String(Number(minutes.toFixed()) > 0 ? minutes.toFixed() : 1);
  }
}

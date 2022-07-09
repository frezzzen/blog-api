import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {}
  async create(createTopicDto: CreateTopicDto) {
    const topic = this.topicRepository.create(createTopicDto);
    topic.articles = [];
    await this.topicRepository.save(topic);
    return HttpStatus.OK;
  }

  findAll() {
    return this.topicRepository.find();
  }

  findOne(id: number) {
    return this.topicRepository
      .createQueryBuilder('topic')
      .leftJoinAndSelect('topic.articles', 'article')
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
      .where('topic.id = :id', { id })
      .getOne();
  }

  remove(id: number) {
    return this.topicRepository.delete(id);
  }
}

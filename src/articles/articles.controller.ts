import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { CookieAuthenticationGuard } from '../authentication/cookie-authentication.guard';
import RequestWithUser from '../authentication/request-with-user.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @UseGuards(CookieAuthenticationGuard)
  @Post()
  create(
    @Body() createArticleDto: CreateArticleDto,
    @Req() req: RequestWithUser,
  ) {
    return this.articlesService.create(createArticleDto, req.user);
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @UseGuards(CookieAuthenticationGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
    @Req() req: RequestWithUser,
  ) {
    return this.articlesService.update(+id, updateArticleDto, req.user);
  }

  @UseGuards(CookieAuthenticationGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.articlesService.remove(+id, req.user);
  }
}

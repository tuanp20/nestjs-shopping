import {
  Controller,
  Get,
  Query,
  Param,
  NotFoundException,
  Post,
  Body,
  Put,
  Delete,
  UseGuards
} from '@nestjs/common';

import { CategoryService } from './category.service';
import { FilterCategoryDTO } from './dtos/filter-category.dto';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.User)
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('/')
  async getCategories(@Query() filterCategoryDTO: FilterCategoryDTO) {
    if (Object.keys(filterCategoryDTO).length) {
      const filteredCategories =
        await this.categoryService.getFilteredCategories(filterCategoryDTO);
      return filteredCategories;
    } else {
      const allCategories = await this.categoryService.getAllCategories();
      return allCategories;
    }
  }

  @Get('/:id')
  async getCategory(@Param('id') id: string) {
    const category = await this.categoryService.getCategory(id);
    if (!category) {
      throw new NotFoundException('Category does not exist!');
    }
    return category;
  }

  @Post('/add')
  async addCategory(@Body() createCategoryDTO: CreateCategoryDTO) {
    const category = await this.categoryService.addCategory(createCategoryDTO);
    return category;
  }

  @Put('/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() createCategoryDTO: CreateCategoryDTO,
  ) {
    const category = await this.categoryService.updateCategory(
      id,
      createCategoryDTO,
    );
    if (!category) {
      throw new NotFoundException('Category does not exist!');
    }
    return category;
  }

  @Delete('/:id')
  async removeCategory(@Param('id') id: string) {
    await this.categoryService.removeCategory(id);
  }
}

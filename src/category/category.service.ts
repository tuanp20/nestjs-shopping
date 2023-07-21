import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { Model } from 'mongoose';
import { FilterCategoryDTO } from './dtos/filter-category.dto';
import { CreateCategoryDTO } from './dtos/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async getAllCategories(): Promise<Category[]> {
    const categories = await this.categoryModel.find().exec();
    return categories;
  }

  async getFilteredCategories(
    filterCategoryDTO: FilterCategoryDTO,
  ): Promise<Category[]> {
    const { search } = filterCategoryDTO;
    let categories = await this.getAllCategories();

    if (search) {
      categories = categories.filter(
        (product) =>
          product.name.includes(search) || product.description.includes(search),
      );
    }
    return categories;
  }

  async addCategory(createCategoryDTO: CreateCategoryDTO): Promise<Category> {
    const newCategory = await this.categoryModel.create(createCategoryDTO);
    return newCategory.save();
  }

  async updateCategory(
    id: string,
    createCategoryDTO: CreateCategoryDTO,
  ): Promise<Category> {
    const updateCategory = await this.categoryModel.findByIdAndUpdate(
      id,
      createCategoryDTO,
      {
        new: true,
      },
    );
    return updateCategory;
  }

  async removeCategory(id: string): Promise<void> {
    await this.categoryModel.findByIdAndRemove(id);
  }

  async getCategory(id: string): Promise<Category> {
    const product = await this.categoryModel.findById(id);
    return product;
  }
}

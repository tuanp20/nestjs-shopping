import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService, PropData } from './product.service';
import { FilterProductDTO } from './dtos/filter-product.dto';
import { CreateProductDTO } from './dtos/create-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.User)
@Controller('store/products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/')
  async getProducts(
    @Query() filterProductDTO: FilterProductDTO,
  ): Promise<PropData> {
    console.log('filterProductDTO', filterProductDTO);
    if (Object.keys(filterProductDTO).length) {
      const filteredProducts = await this.productService.getFilteredProducts(
        filterProductDTO,
      );
      return filteredProducts;
    } else {
      const allProducts = await this.productService.getAllProducts();
      return allProducts;
    }
  }

  @Get('/:id')
  async getProduct(@Param('id') id: string) {
    const product = await this.productService.getProduct(id);
    if (!product) {
      throw new NotFoundException('Product does not exist!');
    }
    return product;
  }

  @Post('/add')
  async addProduct(@Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.addProduct(createProductDTO);
    return product;
  }

  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() createProductDTO: CreateProductDTO,
  ) {
    const product = await this.productService.updateProduct(
      id,
      createProductDTO,
    );
    if (!product) {
      throw new NotFoundException('Product does not exist!');
    }
    return product;
  }

  @Delete('/:id')
  async removeProduct(@Param('id') id: string) {
    await this.productService.removeProduct(id);
  }
}

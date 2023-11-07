import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryDto } from 'src/category/dto/category.dto';
import { PrismaService } from 'src/prisma.service';
import { slugGenerator } from 'src/utils/slugGenerator';
import { returnCategoryObject } from './return-category.object';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async byId(id: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id
      },
      select: returnCategoryObject
    })
    
    if (!category) throw new NotFoundException("Категория не найдена");
    
    return category;
  }
  
  async bySlug(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        slug
      },
      select: returnCategoryObject
    })
    
    if (!category) throw new NotFoundException("Категория не найдена");
    
    return category;
  }

  async createCategory() {
    return this.prisma.category.create({
      data: {
        name: '',
        slug: ''     
      }
    });
  }

  async updateCategory(id: number, dto: CategoryDto) {
    return this.prisma.category.update({
      where: {
        id
      }, 
      data: {
        name: dto.name,
        slug: slugGenerator(dto.name)
      }
    })
  }

  async deleteCategory(id: number) {
    return this.prisma.category.delete({
      where: {
        id
      }, 
    })
  }

  async getAll() {
    return this.prisma.category.findMany({
      select: returnCategoryObject
    })
  }
}

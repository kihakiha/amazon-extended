import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginationService } from 'src/pagination/pagination.service';
import { PrismaService } from 'src/prisma.service';
import { slugGenerator } from 'src/utils/slugGenerator';
import { EnumProductsSort, GetAllProductsDto } from './dto/get-all.products.dto';
import { ProductDto } from './dto/product.dto';
import { returnProductObject, returnProductObjectFullPage } from './return-product.object';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService,
  ) {}

  async getAll(dto: GetAllProductsDto = {}) {
    const {sort, searchTerm} = dto;
    
    const prismaSort: Prisma.ProductOrderByWithRelationInput[] = [];

    if (sort === EnumProductsSort.LOW_PRICE) {
      prismaSort.push({price: 'asc'})
    } else if (sort === EnumProductsSort.HIGH_PRICE) {
      prismaSort.push({price:'desc'})
    } else if (sort === EnumProductsSort.OLDEST) {
      prismaSort.push({createdAt: 'asc'})
    } else {
      prismaSort.push({createdAt: 'desc'})
    }

    const prismaSearchTerm: Prisma.ProductWhereInput = searchTerm ? {
      OR: [
        {
          category: {
            name: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          }
        },
        {
          name: {
            contains: searchTerm,
            mode: 'insensitive'
          }
        },
        {
          description: {
            contains: searchTerm,
            mode: 'insensitive'
          }
        },
      ]
    } : {}

    const {perPage, skip} = this.paginationService.getPagination(dto) 

    const products = await this.prisma.product.findMany({
      where: prismaSearchTerm,
      orderBy: prismaSort,
      skip,
      take: perPage,
    });

    return {products, length: await this.prisma.product.count({
      where: prismaSearchTerm,
    })}
  }

  async byId(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id
      },
      select: returnProductObjectFullPage
    })
    
    if (!product) throw new NotFoundException("Товар не найден");
    
    return product;
  }
  
  async bySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        slug
      },
      select: returnProductObjectFullPage
    })
    
    if (!product) throw new NotFoundException("Товар не найден");
    
    return product;
  }

  async byCategory(categorySlug: string) {
    const products = await this.prisma.product.findMany({
      where: {
        category: {
          slug: categorySlug
        }
      },
      select: returnProductObjectFullPage
    })
    
    if (!products) throw new NotFoundException("Товар не найден");
    
    return products;
  }

  async getSimilar(id: number) {
    const currentProduct = await this.byId(id);

    if (!currentProduct) throw new NotFoundException("Товар не найден")

    const products = await this.prisma.product.findMany({
      where: {
        category: {
          name: currentProduct.category.name
        },
        NOT: {
          id: currentProduct.id
        },
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: returnProductObject
    })
    
    return products;
  }

  async createProduct() {
    const product = await this.prisma.product.create({
      data: {
        name: '',
        slug: '',
        price: 0,
        description: '',
        categoryId: 1,
      }
    });

    return product.id
  } 

  async updateProduct(id: number, dto: ProductDto) {
    return this.prisma.product.update({
      where: {
        id
      }, 
      data: {
        name: dto.name,
        slug: slugGenerator(dto.name),
        description: dto.description,
        images: dto.images,
        price: dto.price,
        category: {
          connect: {
            id: dto.categoryId,
          }
        }
      }
    })
  }

  async deleteProduct(id: number) {
    return this.prisma.product.delete({where: { id } })
  }
}

import { faker } from '@faker-js/faker';
import { PrismaClient, Product } from '@prisma/client';
import * as dotenv from 'dotenv';
import { randomNumber } from '../src/utils/randomNumber';
import { slugGenerator } from '../src/utils/slugGenerator';

dotenv.config();

const prisma = new PrismaClient();

const createProduct = async (amount: number) => {
  const products: Product[] = [];
  for (let i = 0; i < amount; i++) {
    const productName = faker.commerce.productName();
    const categoryName = faker.commerce.department();
    
    const product = await prisma.product.create({
      data: {
        name: productName,
        slug: slugGenerator(productName),
        description: faker.commerce.productDescription(),
        price: +faker.commerce.price({min: 100, max: 99999, dec: 0}),
        images: Array.from({length: randomNumber(2, 6)}).map(() => faker.image.url()),

        category: {
          create: {
            name: categoryName,
            slug: slugGenerator(categoryName),
          }
        },

        review: {
          create: [
            {
              text: faker.lorem.paragraphs(),
              rating: randomNumber(1,5),
              user: {
                connect: {
                  id: 1
                }
              }
            }, {
              text: faker.lorem.paragraphs(),
              rating: randomNumber(1,5),
              user: {
                connect: {
                  id: 1
                }
              }
            }
          ]
          
        }
      }
    });

    products.push(product);
  }
}

async function main() {
  await createProduct(10)
}

main()
  .catch(e => console.log(e))
  .finally(async () => {
    await prisma.$disconnect
  });
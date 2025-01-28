import { faker } from "@faker-js/faker/.";
import { ProductDetailsBody } from "./types";

export const detailsMock: ProductDetailsBody = {
  id: faker.string.uuid(),
  brand: faker.company.name(),
  name: faker.commerce.productName(),
  description: faker.lorem.paragraph(),
  basePrice: +faker.commerce.price(),
  rating: faker.number.int(),
  specs: {
    screen: faker.word.words(),
    resolution: faker.word.words(),
    processor: faker.word.words(),
    mainCamera: faker.word.words(),
    selfieCamera: faker.word.words(),
    battery: faker.word.words(),
    os: faker.word.words(),
    screenRefreshRate: faker.word.words(),
  },
  colorOptions: [
    {
      name: faker.word.words(),
      hexCode: faker.string.hexadecimal(),
      imageUrl: faker.image.url(),
    },
  ],
  storageOptions: [
    {
      capacity: faker.word.words(),
      price: +faker.commerce.price(),
    },
  ],
  similarProducts: [
    {
      id: faker.string.uuid(),
      brand: faker.company.name(),
      name: faker.commerce.productName(),
      basePrice: +faker.commerce.price(),
      imageUrl: faker.image.url(),
    },
  ],
};

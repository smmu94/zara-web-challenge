import { faker } from "@faker-js/faker/.";
import { ProductDetailsBody } from "./types";

export const detailsMock: ProductDetailsBody = {
  id: faker.datatype.uuid(),
  brand: faker.company.name(),
  name: faker.commerce.productName(),
  description: faker.lorem.paragraph(),
  basePrice: +faker.commerce.price(),
  rating: faker.datatype.number(),
  specs: {
    screen: faker.word.adjective(),
    resolution: faker.word.adjective(),
    processor: faker.word.adjective(),
    mainCamera: faker.word.adjective(),
    selfieCamera: faker.word.adjective(),
    battery: faker.word.adjective(),
    os: faker.word.adjective(),
    screenRefreshRate: faker.word.adjective(),
  },
  colorOptions: [
    {
      name: faker.word.adjective(),
      hexCode: faker.internet.color(),
      imageUrl: faker.image.imageUrl(),
    },
  ],
  storageOptions: [
    {
      capacity: faker.word.adjective(),
      price: +faker.commerce.price(),
    },
  ],
  similarProducts: [
    {
      id: faker.datatype.uuid(),
      brand: faker.company.name(),
      name: faker.commerce.productName(),
      basePrice: +faker.commerce.price(),
      imageUrl: faker.image.imageUrl(),
    },
  ],
};

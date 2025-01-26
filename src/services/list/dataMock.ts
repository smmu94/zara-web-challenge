import { faker } from "@faker-js/faker/.";
import { ProductListBody, QueryParams } from "./types";

export const queryParamsMock: QueryParams = {
  search: faker.lorem.sentence(),
  limit: faker.number.int(),
  offset: faker.number.int(),
};

export const listMock: ProductListBody = Array.from({ length: 10 }, () => ({
  id: faker.string.uuid(),
  brand: faker.lorem.sentence(),
  name: faker.commerce.productName(),
  basePrice: +faker.commerce.price(),
  imageUrl: faker.image.url()
}));

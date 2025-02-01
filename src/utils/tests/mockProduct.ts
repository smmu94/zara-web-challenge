import { SelectedProduct } from "@contexts/selectedProductsContext/types";
import { faker } from "@faker-js/faker/.";

export const mockProduct: SelectedProduct = {
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
  color: {
    hexCode: faker.color.rgb(),
    name: faker.color.human(),
    imageUrl: faker.image.url(),
  },
  storage: {
    capacity: faker.number.int().toString(),
    price: +faker.commerce.price(),
  },
};  
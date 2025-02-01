import { SelectedProduct } from "@contexts/selectedProductsContext/types";
import { faker } from "@faker-js/faker/.";

export const mockProduct: SelectedProduct = {
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  color: {
    hexCode: faker.color.rgb(),
    name: faker.color.human(),
    imageUrl: faker.image.imageUrl(),
  },
  storage: {
    capacity: faker.random.numeric(),
    price: +faker.commerce.price(),
  },
};  
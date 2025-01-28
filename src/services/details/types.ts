export type QueryParams = {
    search: string,
    limit: number,
    offset: number
}

export type ProductDetailsBody = {
    id: string;
    brand: string;
    name: string;
    description: string;
    basePrice: number;
    rating: number;
    specs: {
      screen: string;
      resolution: string;
      processor: string;
      mainCamera: string;
      selfieCamera: string;
      battery: string;
      os: string;
      screenRefreshRate: string;
    };
    colorOptions: Array<{
      name: string;
      hexCode: string;
      imageUrl: string;
    }>;
    storageOptions: Array<{
      capacity: string;
      price: number;
    }>;
    similarProducts: Array<{
      id: string;
      brand: string;
      name: string;
      basePrice: number;
      imageUrl: string;
    }>;
  };
  
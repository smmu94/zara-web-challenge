export type FormData = {
    storage: {
        capacity: string;
        price: number;
    };
    color: {
        hexCode: string;
        name: string;
        imageUrl: string;
    };
};

export const initialValues: FormData = {
  storage: {
    capacity: "",
    price: 0,
  },
  color: {
    hexCode: "",
    name: "",
    imageUrl: "",
  }
};
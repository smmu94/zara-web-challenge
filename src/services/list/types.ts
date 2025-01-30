export type QueryParams = {
    search: string,
    limit: number,
    offset: number
}

export type Product = {
    id: string,
    brand: string,
    name: string,
    basePrice: number,
    imageUrl: string
}

export type ProductListBody = Array<Product>;
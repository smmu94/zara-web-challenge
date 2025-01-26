export type QueryParams = {
    search: string,
    limit: number,
    offset: number
}

export type ProductListBody = Array<{
    id: string,
    brand: string,
    name: string,
    basePrice: number,
    imageUrl: string
}>;
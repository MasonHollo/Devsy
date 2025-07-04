
export interface Idata {
    data: any
}

export interface Iproduct {
    name: string;
    description: string;
    price: number;
    id: number;
    userId: number;
    ProductImages?: ProductImage[];

}
interface ProductState {
  allProducts: Iproduct[];
  byId: { [key: number]: Iproduct };
}


export interface Idata {
    data: any
}

export interface Iproduct {
    name: string;
    description: string;
    price: number;

}
interface ProductState {
  allProducts: Iproduct[];
  byId: { [key: number]: Iproduct };
}

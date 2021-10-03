export interface LookupTable {
  id: number;
  name: string;
  codes?: string[];
}

export interface Selectors {
  id?: string;
  product: string;
  sku: string;
  name: string;
  category?: string;
  url: string;
  imageUrl: string;
  price: string;
  listPrice: string;
  discount: string;
  discountPercentage: string;
  availability: string;
  arrivalDate: string;
  condition?: string;
  nextPage: string;
}

export enum AvailabilityEnum {
  Available = 1,
  OutOfStock = 2,
  UpcomingRelease = 3,
  Presale = 4,
}

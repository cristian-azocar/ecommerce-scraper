export default interface IProduct {
  id: number;
  retailId: number;
  categoryId: number;
  sku: string;
  name: string;
  platformId: number;
  url: string;
  imageUrl: string;
  sourceUrl: string;
  price: number;
  listPrice: number;
  discount: number;
  discountPercentage: number;
  availabilityId: number;
  arrivalDate: Date;
  conditionId: number;
}

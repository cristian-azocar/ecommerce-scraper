export default interface IProduct {
  id: number;
  websiteId: number; // TODO: use Website enum?
  sku: string;
  name: string;
  platformId: number; // TODO: use Platform enum?
  url: string;
  imageUrl: string;
  catalogUrl: string;
  price: number;
  listPrice: number;
  discount: number;
  discountPercentage: number;
  availabilityId: number; // TODO: use Availability enum?
  estimatedArrivalDate: Date;
  conditionId: number; // TODO: use Condition enum?
}

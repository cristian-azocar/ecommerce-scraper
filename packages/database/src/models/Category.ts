export default interface Category {
  id: number;
  parentId?: number;
  name: string;
  slug: string;
  codes?: string[];
  isActive: boolean;
}

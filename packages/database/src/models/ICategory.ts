export default interface ICategory {
  id: number;
  parentId?: number;
  name: string;
  slug: string;
  codes?: string[];
  isActive: boolean;
}

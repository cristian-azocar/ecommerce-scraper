export default interface ICategory {
  id: number;
  parentId?: number;
  code: string;
  name: string;
  isActive: boolean;
}

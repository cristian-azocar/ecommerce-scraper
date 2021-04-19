import { Knex } from 'knex';

export type Column = {
  name: string;
  type: string;
  length?: number;
  nullable?: boolean;
  primaryKey?: boolean;
  textType?: string;
  precision?: number;
  scale?: number;
  useTz?: boolean;
  enumValues?: Knex.Value[];
  foreignKey?: { columnName: string; tableName: string };
};

export type Table = {
  tableName: string;
  columns: Column[];
  timestamps: boolean;
  primaryKey?: string[];
};

// Helper function to infer the keys of an object and at the same time restrict the value types.
// Cannot use "Record<K, T>" because the IntelliSense doesn't autocomplete anonymous objects.
const asTypedObject = <E>() => <T>(et: { [K in keyof T]: E }) => et;

const schema = asTypedObject<Table>()({
  availability: {
    tableName: 'availability',
    columns: [
      { name: 'id', type: 'increments', primaryKey: true },
      { name: 'name', type: 'string', length: 32, nullable: false },
      { name: 'slug', type: 'string', length: 32, nullable: false },
      { name: 'codes', type: 'varchar(32)[]' },
    ],
    timestamps: true,
  },
  condition: {
    tableName: 'condition',
    columns: [
      { name: 'id', type: 'increments', primaryKey: true },
      { name: 'name', type: 'string', length: 32, nullable: false },
      { name: 'slug', type: 'string', length: 32, nullable: false },
      { name: 'codes', type: 'varchar(32)[]' },
    ],
    timestamps: true,
  },
  retail: {
    tableName: 'retail',
    columns: [
      { name: 'id', type: 'increments', primaryKey: true },
      { name: 'name', type: 'string', length: 64, nullable: false },
      { name: 'slug', type: 'string', length: 64, nullable: false },
      { name: 'base_url', type: 'string', length: 512, nullable: false },
      { name: 'urls', type: 'varchar(512)[]' },
      { name: 'is_active', type: 'boolean', nullable: false },
      { name: 'http_method', type: 'string', length: 8, nullable: false },
      { name: 'pagination', type: 'json', nullable: false },
      { name: 'selectors', type: 'json', nullable: false },
    ],
    timestamps: true,
  },
  category: {
    tableName: 'category',
    columns: [
      { name: 'id', type: 'increments', primaryKey: true },
      { name: 'parent_id', type: 'integer' },
      { name: 'name', type: 'string', length: 128, nullable: false },
      { name: 'slug', type: 'string', length: 64, nullable: false },
      { name: 'is_active', type: 'boolean', nullable: false },
      { name: 'codes', type: 'varchar(32)[]' },
    ],
    timestamps: true,
  },
  product: {
    tableName: 'product',
    columns: [
      { name: 'id', type: 'integer', nullable: false },
      {
        name: 'retail_id',
        type: 'integer',
        nullable: false,
        foreignKey: { columnName: 'id', tableName: 'retail' },
      },
      {
        name: 'category_id',
        type: 'integer',
        foreignKey: { columnName: 'id', tableName: 'category' },
      },
      { name: 'sku', type: 'string', length: 64 },
      { name: 'name', type: 'string', length: 512, nullable: false },
      { name: 'slug', type: 'string', length: 512, nullable: false },
      { name: 'attributes', type: 'json' },
      { name: 'url', type: 'string', length: 512, nullable: false },
      { name: 'imageUrl', type: 'string', length: 512, nullable: false },
      { name: 'sourceUrl', type: 'string', length: 512, nullable: false },
      { name: 'price', type: 'integer', nullable: false },
      { name: 'listPrice', type: 'integer', nullable: false },
      { name: 'discount', type: 'integer' },
      { name: 'discountPercentage', type: 'integer' },
      {
        name: 'availability_id',
        type: 'integer',
        foreignKey: { columnName: 'id', tableName: 'availability' },
      },
      { name: 'arrival_date', type: 'timestamp' },
      {
        name: 'condition_id',
        type: 'integer',
        foreignKey: { columnName: 'id', tableName: 'condition' },
      },
    ],
    primaryKey: ['id', 'retail_id'],
    timestamps: true,
  },
});

export default schema;

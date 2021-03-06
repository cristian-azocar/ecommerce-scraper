import { Knex } from 'knex';
import asTypedObject from '../utils/asTypedObject';
import { buildHistoryTrigger, buildOnUpdateTrigger } from '../utils/dbUtils';

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
  foreignKey?: { column: string; table: string };
  defaultValue?: string;
};

export type Table = {
  tableName: string;
  columns: Column[];
  timestamps?: boolean;
  primaryKey?: string[];
  triggers?: string[];
};

const schema = asTypedObject<Table>()({
  tableHistory: {
    tableName: 'table_history',
    columns: [
      { name: 'id', type: 'integer', nullable: false },
      { name: 'table_name', type: 'string', length: 64, nullable: false },
      {
        name: 'dml_type',
        type: 'enum',
        enumValues: ['INSERT', 'UPDATE', 'DELETE'],
        nullable: false,
      },
      { name: 'created_at', type: 'timestamp', useTz: true, nullable: false },
      {
        name: 'created_by',
        type: 'string',
        length: 255,
        nullable: false,
        defaultValue: 'current_user',
      },
      { name: 'old_data', type: 'json' },
      { name: 'new_data', type: 'json' },
    ],
    primaryKey: ['id', 'dml_type', 'created_at'],
  },
  availability: {
    tableName: 'availability',
    columns: [
      { name: 'id', type: 'increments', primaryKey: true },
      { name: 'name', type: 'string', length: 32, nullable: false },
      { name: 'slug', type: 'string', length: 32, nullable: false },
      { name: 'codes', type: 'varchar(32)[]' },
    ],
    timestamps: true,
    triggers: [buildOnUpdateTrigger('availability')],
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
    triggers: [buildOnUpdateTrigger('condition')],
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
    triggers: [buildOnUpdateTrigger('retail')],
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
    triggers: [buildOnUpdateTrigger('category')],
  },
  product: {
    tableName: 'product',
    columns: [
      { name: 'id', type: 'integer', nullable: false },
      {
        name: 'retail_id',
        type: 'integer',
        nullable: false,
        foreignKey: { column: 'id', table: 'retail' },
      },
      {
        name: 'category_id',
        type: 'integer',
        foreignKey: { column: 'id', table: 'category' },
      },
      { name: 'sku', type: 'string', length: 64 },
      { name: 'name', type: 'string', length: 512, nullable: false },
      { name: 'slug', type: 'string', length: 512, nullable: false },
      { name: 'attributes', type: 'json' },
      { name: 'url', type: 'string', length: 512, nullable: false },
      { name: 'image_url', type: 'string', length: 512, nullable: false },
      { name: 'source_url', type: 'string', length: 512, nullable: false },
      { name: 'price', type: 'integer', nullable: false },
      { name: 'list_price', type: 'integer', nullable: false },
      { name: 'discount', type: 'integer' },
      { name: 'discount_percentage', type: 'integer' },
      {
        name: 'availability_id',
        type: 'integer',
        foreignKey: { column: 'id', table: 'availability' },
      },
      { name: 'arrival_date', type: 'timestamp' },
      {
        name: 'condition_id',
        type: 'integer',
        foreignKey: { column: 'id', table: 'condition' },
      },
    ],
    primaryKey: ['id', 'retail_id'],
    timestamps: true,
    triggers: [buildOnUpdateTrigger('product'), buildHistoryTrigger('product')],
  },
});

export default schema;

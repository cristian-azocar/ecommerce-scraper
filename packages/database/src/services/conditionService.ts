import db from '../internal/dbClient';
import schema from '../schemaBuilder/schema';
import Condition from '../models/Condition';

const { condition } = schema;

export default class ConditionService {
  async findAll(): Promise<Condition[]> {
    return db.select().from(condition.tableName);
  }
}

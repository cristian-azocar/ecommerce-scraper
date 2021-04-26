import db from '../client';
import schema from '../schema';
import Condition from '../models/Condition';

const { condition } = schema;

export class ConditionService {
  async findAll(): Promise<Condition[]> {
    return db.select().from(condition.tableName);
  }
}

export default new ConditionService();

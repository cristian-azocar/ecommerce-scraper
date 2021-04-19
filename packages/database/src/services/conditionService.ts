import db from '../client';
import schema from '../schema';
import Condition from '../types/Condition';

const { tables } = schema;

class ConditionService {
  async findAll(): Promise<Condition[]> {
    return db.select().from(tables.condition.tableName);
  }
}

export default new ConditionService();

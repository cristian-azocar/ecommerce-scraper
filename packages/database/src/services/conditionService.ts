import db from '../client';
import schema from '../schema';
import Condition from '../types/Condition';

const { condition } = schema;

class ConditionService {
  async findAll(): Promise<Condition[]> {
    return db.select().from(condition.tableName);
  }
}

export default new ConditionService();

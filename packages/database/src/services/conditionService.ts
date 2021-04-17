import db from '../client';
import schema from '../schema';
import ICondition from '../types/ICondition';

const { tables } = schema;

class ConditionService {
  async find(query?: Partial<ICondition>): Promise<ICondition[]> {
    return db
      .select('*')
      .from(tables.condition.tableName)
      .where(query || {});
  }
}

export default new ConditionService();

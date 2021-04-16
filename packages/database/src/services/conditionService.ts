import db from 'src/client';
import schema from 'src/schema';
import ICondition from 'src/models/ICondition';

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

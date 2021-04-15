import ICondition from 'src/models/ICondition';
import db from 'src/db/client';
import schema from 'src/db/schema';

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

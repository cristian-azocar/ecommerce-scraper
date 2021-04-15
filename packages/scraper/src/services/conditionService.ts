import db, { ICondition, schema } from '@project/database';

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

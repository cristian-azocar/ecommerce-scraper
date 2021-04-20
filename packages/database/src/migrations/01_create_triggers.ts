import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    CREATE OR REPLACE FUNCTION on_update_timestamp() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS
    $$
    BEGIN
      NEW.updated_at = CURRENT_TIMESTAMP;
      RETURN NEW;
    END;
    $$;
  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    DROP FUNCTION IF EXISTS on_update_timestamp() CASCADE;
  `);
}

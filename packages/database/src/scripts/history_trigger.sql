CREATE OR REPLACE FUNCTION history_trigger()
RETURNS trigger AS $body$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO table_history (id, dml_type, created_at, created_by, old_data, new_data)
    VALUES (NEW.id, 'INSERT', CURRENT_TIMESTAMP, CURRENT_USER, NULL, to_json(NEW));
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO table_history (id, dml_type, created_at, created_by, old_data, new_data)
    VALUES (NEW.id, 'UPDATE', CURRENT_TIMESTAMP, CURRENT_USER, to_json(OLD), to_json(NEW));
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO table_history (id, dml_type, created_at, created_by, old_data, new_data)
    VALUES (OLD.id, 'DELETE', CURRENT_TIMESTAMP, CURRENT_USER, to_json(OLD), NULL);
    RETURN OLD;
  END IF;
END;
$body$
LANGUAGE plpgsql;

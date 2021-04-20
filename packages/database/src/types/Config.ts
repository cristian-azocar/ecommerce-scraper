export default interface Config {
  connection: {
    user: string;
    password: string;
    host: string;
    port: number;
    database: string;
  };
  debug: boolean;
}

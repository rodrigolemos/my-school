import { createConnection, getConnectionOptions, Connection } from 'typeorm';

export default async (name = 'default'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      name,
      url:
        name === 'test'
          ? process.env.TEST_DATABASE_URL
          : process.env.DATABASE_URL,
    }),
  );
};

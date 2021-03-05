import { ConnectionOptions, getConnectionManager } from 'typeorm';
import { User } from '../entity/User';
import { Game } from '../entity/Game';
import { Review } from '../entity/Review';

const createConnection = async () => {
  const options: ConnectionOptions = {
    type: 'sqlite',
    database: `:memory:`,
    entities: [User, Game, Review],
    synchronize: true,
    logging: true
  };

  const connectionManager = getConnectionManager();

  if (!connectionManager.has('default')) {
    connectionManager.create(options);
  }
  try {
    const db = connectionManager.get();
    await db.connect();
  } catch (error) {
    console.log(error);
    return;
  }
};

export { createConnection };

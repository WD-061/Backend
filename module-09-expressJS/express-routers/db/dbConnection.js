import { Sequelize } from 'sequelize';

// Make sure you have the connection string on .env
//You can get rid of the console logs from sequelize by setting logging to false like below
const sequelize = new Sequelize(process.env.POSTGRES_URI, { logging: false });

try {
  await sequelize.authenticate(); //Tests the connection with the DB
  console.log('Connection to DB was successful');
} catch (error) {
  console.log('Connection to DB failed!');
}

export default sequelize;

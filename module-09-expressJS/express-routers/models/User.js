import { DataTypes } from 'sequelize';
import sequelize from '../db/dbConnection.js';

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.sync();

export default User;

import sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define('user', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
});

User.sync();

export default User;

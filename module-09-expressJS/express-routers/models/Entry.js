import { DataTypes } from 'sequelize';
import sequelize from '../db/dbConnection.js';
import User from './User.js';

const Entry = sequelize.define('Entries', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  authorID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Define relationships. Sequelize call it 'assocications' in their docs
User.hasMany(Entry, { foreignKey: 'authorID' });
Entry.belongsTo(User, { foreignKey: 'authorID', as: 'author' });

Entry.sync();

export default Entry;

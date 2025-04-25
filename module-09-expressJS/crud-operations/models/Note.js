import sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';

const Note = sequelize.define('note', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Note.sync();

export default Note;

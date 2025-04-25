import sequelize from '../db/index.js';
import Note from './Note.js';
import User from './User.js';

const UsersNotes = sequelize.define('UsersNotes');

User.belongsToMany(Note, { through: 'UsersNotes' });
Note.belongsToMany(User, { through: 'UsersNotes' });

// sequelize.sync({ alter: true });
sequelize.sync();

export { Note, User, UsersNotes };

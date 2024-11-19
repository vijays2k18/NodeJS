import { DataTypes } from 'sequelize';
import sequelize from '../middleware/db.js';

const User = sequelize.define('User', {
  // Define columns based on your database table
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: false,  // Disable automatic timestamps (createdAt, updatedAt)
});

export default User;

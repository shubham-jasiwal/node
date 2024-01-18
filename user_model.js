import { Sequelize, DataTypes } from "sequelize"
import s from './postgres.js';

const User = s.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  Password: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  tableName: 'Users'
});

// // `sequelize.define` also returns the model
// console.log(User === s.models.User); // 

export default User;


export const noway = s.define('noway', {
    relation:{
        type:DataTypes.INTEGER,
        references:{
            model:User,
            key:'id',
        }
    },
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    Password: {
      type: DataTypes.STRING
      // allowNull defaults to true
    }
  }, {
    // Other model options go here
    tableName: 'noway'
  });
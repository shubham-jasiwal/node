import { Sequelize } from "sequelize";

 const s = new Sequelize('node', 'postgres', '9977453604', {
    host: 'localhost',
    dialect: 'postgres'
  });

export default s;
import { Sequelize } from "sequelize";

const sequelize = new Sequelize('EbuyDB', 'master', '1502', {
  host: 'localhost:8080',
  dialect: 'postgres' 
});

export default sequelize;
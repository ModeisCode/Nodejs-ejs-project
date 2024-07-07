import sequelize from "../connection.mjs";
import { Sequelize } from "sequelize";

const User = sequelize.define('User' , {
    userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: true,
    }
});

export default User;
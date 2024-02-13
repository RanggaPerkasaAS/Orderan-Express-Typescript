import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
import { Users } from "../models/Users";
import { Product } from "../models/Product";
import { Order } from "../models/Order";
dotenv.config();

class Database {
    public sequelize: Sequelize | undefined;

    private DB_HOST = process.env.DB_HOST as string;
    private DB_USER = process.env.DB_USER as string;
    private DB_PASSWORD = process.env.DB_PASSWORD as string;
    private DB_NAME = process.env.DB_NAME as string;

    constructor(){
        this.connectToDatabase();
    }

    private async connectToDatabase() {
        this.sequelize = new Sequelize({
          database: this.DB_NAME,
          username: this.DB_USER,
        //   password: this.DB_PASSWORD,
          host: this.DB_HOST,
          dialect: "mysql",
          models: [Users,Product, Order]
        });
        
        await this.sequelize
        .authenticate()
        .then(() => {
          console.log("Connection has been established successfully.");
        })
        .catch((err) => {
          console.error("Unable to connect to the Database:", err);
        });
    }
}

export default Database;
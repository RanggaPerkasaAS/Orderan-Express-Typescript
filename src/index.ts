import express, { Application, Request, Response } from "express";
import Database from "./db/config";
import ProductRouter from "./router/ProductRouter";
import AuthenticationRouter from "./router/AuthenticationRouter";
import OrderRouter from "./router/OrderRouter";

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.databaseSync();
        this.plugins();
        this.routes();
    }

    protected routes(): void {
        this.app.route("/").get((req: Request, res: Response) => {
            res.send("Welcome!")
        })
        this.app.use("/api/v1/product", ProductRouter);
        this.app.use("/api/v1/auth", AuthenticationRouter);
        this.app.use("/api/v1/order", OrderRouter);
    }

    // add database sync
    protected databaseSync(): void {
        const db = new Database();
        db.sequelize?.sync();
    }

    protected plugins(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
}


const port: number = 8000;
const app = new App().app;

app.listen(port, () => {
    console.log(`✅ Server ${port} started successfully!`);
});
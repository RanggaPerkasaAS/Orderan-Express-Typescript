import OrderController from "../controller/OrderController";
import { auth } from "../middleware/AuthMiddleware";
import BaseRoutes from "./BaseRouter";

class OrderRoutes extends BaseRoutes {
    routes(): void {
        this.router.post("/order", auth, OrderController.order);
        this.router.get("/orderHistory", auth, OrderController.orderHistory);
    }
}

export default new OrderRoutes().router;
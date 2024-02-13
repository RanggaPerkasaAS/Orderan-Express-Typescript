import ProductController from "../controller/ProductController";
import { auth } from "../middleware/AuthMiddleware";
import upload from "../middleware/ImageConfig";
import BaseRoutes from "./BaseRouter";

class ProductRoutes extends BaseRoutes {
    routes(): void {
        this.router.post("/add", auth, upload.single('filename'), ProductController.create);
        this.router.get("/getAll", auth, ProductController.getAll);
        this.router.get("/getWithAxios", auth, ProductController.getWithAxios);
        this.router.get("/getByName", auth, ProductController.getByName);
        this.router.get("/update/:id", auth, ProductController.update);
        this.router.get("/delete", auth, ProductController.delete);
    }
}

export default new ProductRoutes().router;
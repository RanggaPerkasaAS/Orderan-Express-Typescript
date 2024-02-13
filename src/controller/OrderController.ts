import { Request, Response } from "express";
import { OrderRepo } from "../repository/OrderRepo";

class OrderController {

    async order(req: Request, res: Response) {
        try {
            let order = {
                product_id:  req.body.product_id,
                user_id:  req.body.user_id,
                qty:  req.body.qty,
            }

            await new OrderRepo().order(order)
            
            return res.status(200).json({
                status: "200",
                message: "Successfully add product!",
            });
        } catch (error) {
            return res.status(500).json({
                status: "500",
                message: "Internal Server Error",
                error: error
            })
        }
    }

    async orderHistory(req: Request, res: Response){
        try {
            const data = await new OrderRepo().orderHistory();

            return res.status(200).json({
                status: "200",
                message: "Successfully get all order history!",
                data: data
            });
        } catch (error) {
            return res.status(500).json({
                status: "500",
                message: "Internal Server Error",
                error: error
            })
        }
    }
}

export default new OrderController();
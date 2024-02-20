import { Sequelize } from 'sequelize';
import { Order } from "../models/Order";
import { Product } from "../models/Product";
import { Users } from '../models/Users';


interface IOrderRepo {
    order(order: { product_id: number, qty: number }): Promise<void>;
    orderHistory(): Promise<any>;
}

export class OrderRepo implements IOrderRepo {
    async order(order: { user_id: number, product_id: number, qty: number }): Promise<void> {
        try {
            const findProduct = await Product.findOne({
                where: {
                    id: order.product_id
                }
            })

            if (!findProduct) {
                throw new Error("Product not found!");
            }

            const new_stock = findProduct.stock - order.qty;

            if (new_stock < 0) {
                throw new Error("Insufficient stock!");
            }

            await Product.update(
                { stock: new_stock },
                { where: { id: order.product_id } }
            );

            await Order.create({
                product_id: order.product_id,
                user_id: order.user_id,
                qty: order.qty,
                total_price: findProduct.price * order.qty,
                order_at: new Date()
            });
        } catch (error) {
            throw new Error("Failed to order!" + error);

        }
    }

    async orderHistory(): Promise<any> {
        try {
            const orders = await Order.sequelize?.query(`
            SELECT o.*, p.name AS product_name, p.price AS product_price, u.name AS user_name 
            FROM \`order\` o 
            INNER JOIN product p ON o.product_id = p.id 
            INNER JOIN users u ON o.user_id = u.id 
            ORDER BY o.order_at DESC`);

            return orders;
        } catch (error) {
            throw new Error("Failed to get all order history" + error);
        }
    }
}
import { Request, Response } from "express";
import { Product } from "../models/Product";
import { ProductRepo } from "../repository/ProductRepo";
import multer from 'multer'


class ProductController {

    async create(req: Request, res: Response) {
        try {
            const { name, description, stock, price } = req.body;

            if (!req.file) {
                return res.status(400).json({
                    status: "400",
                    message: "No file uploaded."
                });
            }

            const filename = req.protocol + '://' + req.get('host') + '/' + req.file.path;

            const new_product = new Product();
            new_product.name = name,
                new_product.description = description,
                new_product.stock = stock,
                new_product.price = price,
                new_product.image = filename,

                await new ProductRepo().create(new_product);

            return res.status(200).json({
                status: "200",
                message: "Successfully add product!",
            });
        } catch (error) {
            return res.status(500).json({
                status: "500",
                message: "Internal Server Error"
            })
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const data = await new ProductRepo().getAll();

            return res.status(200).json({
                status: "200",
                message: "Successfully get all product!",
                data: data
            });
        } catch (error) {
            return res.status(500).json({
                status: "500",
                message: "Internal Server Error"
            })
        }
    }

    async getByName(req: Request, res: Response) {
        try {
            const name = req.body.name;

            const data = await new ProductRepo().findByName(name);

            return res.status(200).json({
                status: "200",
                message: "Successfully get product by name!",
                data: data
            });
        } catch (error) {
            return res.status(500).json({
                status: "500",
                message: "Internal Server Error"
            })
        }
    }

    async getWithAxios(req: Request, res: Response) {
        try {
            const dataAxios = await new ProductRepo().getWithAxios();

            return res.status(200).json({
                status: "200",
                message: "Successfully get data with axios!",
                data: dataAxios.data
            });
        } catch (error) {
            return res.status(500).json({
                status: "500",
                message: "Internal Server Error"
            })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { name, description, stock, price } = req.body;
            const id: any = req.params.id;

            if (!req.file) {
                return res.status(400).json({
                    status: "400",
                    message: "No file uploaded."
                });
            }

            const filename = req.protocol + '://' + req.get('host') + '/' + req.file.path;

            const update_product = new Product();
            update_product.name = name,
                update_product.description = description,
                update_product.stock = stock,
                update_product.price = price,
                update_product.image = filename,

                await new ProductRepo().update(update_product, id);

            return res.status(200).json({
                status: "200",
                message: "Successfully update product!",
            });

        } catch (error) {
            return res.status(500).json({
                status: "500",
                message: "Internal Server Error"
            })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = req.body.id;

            await new ProductRepo().delete(id);

            return res.status(200).json({
                status: "200",
                message: "Successfully delete product!",
            });
        } catch (error) {
            return res.status(500).json({
                status: "500",
                message: "Internal Server Error"
            })
        }
    }
}

export default new ProductController();
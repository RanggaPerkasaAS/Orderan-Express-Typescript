import axios from "axios";
import { Product } from "../models/Product";
import { Op } from "sequelize";

interface IProductRepo {
    create(product: Product): Promise<void>;
    update(product: Product, id: number): Promise<void>;
    delete(productId: number): Promise<void>;
    getById(productId: number): Promise<Product>;
    getAll(): Promise<Product[]>;
}

export class ProductRepo implements IProductRepo {
    async create(product: Product): Promise<void> {
        try {
            await Product.create({
                name: product.name,
                description: product.description,
                stock: product.stock,
                price: product.price,
                image: product.image,
            });
        } catch (error) {
            throw new Error("Failed to create product!" + error);
        }
    }

    async update(product: Product, id: number): Promise<void> {
        try {
            //  find existing product
            const new_product = await Product.findOne({
                where: {
                    id: id,
                },
            });

            if (!new_product) {
                throw new Error("product not found");
            }
            // update
            new_product.name = product.name;
            (new_product.description = product.description),
            (new_product.stock = product.stock),
            (new_product.image = product.image),
            (new_product.price = product.price);

            await new_product.save();
        } catch (error) {
            throw new Error("Failed to update product!" + error);
        }
    }

    async delete(productId: number): Promise<void> {
        try {
            //  find existing product
            const new_product = await Product.findOne({
                where: {
                    id: productId,
                },
            });

            if (!new_product) {
                throw new Error("product not found");
            }
            // delete
            await new_product.destroy();
        } catch (error) {
            throw new Error("Failed to delete product!" + error);
        }
    }

    async getById(productId: number): Promise<Product> {
        try {
            //  find existing product
            const new_product = await Product.findOne({
                where: {
                    id: productId,
                },
            });

            if (!new_product) {
                throw new Error("product not found");
            }
            // product data
            return new_product;
        } catch (error) {
            throw new Error("Failed to delete product!" + error);
        }
    }

    async getAll(): Promise<Product[]> {
        try {
            return await Product.findAll();
        } catch (error) {
            throw new Error("Failed to fecth all data!" + error);
        }
    }

    async getWithAxios(): Promise<any> {
        try {
            const dataAxios = await axios.get('https://fakestoreapi.com/products')
            return dataAxios;
        } catch (error) {
            throw new Error(`Axios filed fetch data ${error}`);
        }
    }

    async findByName(name: string): Promise<Product> {
        try {
            const data = await Product.findOne({
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    }
                },
            });
            if (!data) {
                throw new Error("Product not found!");
            }

            return data;
        } catch (error) {
            throw new Error("Failed to fecth data by Name!" + error);
        }
    }
}
import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: Product.VAR_TABLE_NAME,
})
export class Product extends Model {
    public static VAR_TABLE_NAME = "product" as string;
    public static VAR_ID = "id" as string;
    public static VAR_NAME = "name" as string;
    public static VAR_DESCRIPTION = "description" as string;
    public static VAR_IMAGE = "image" as string;
    public static VAR_STOCK = "stock" as string;
    public static VAR_PRICE = "price" as string;

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: Product.VAR_ID,
    })
    id!: number;

    @Column({
        type: DataType.STRING(100),
        field: Product.VAR_NAME,
    })
    name!: string;

    @Column({
        type: DataType.STRING(255),
        field: Product.VAR_DESCRIPTION,
    })
    description!: string;

    @Column({
        type: DataType.STRING(255),
        field: Product.VAR_IMAGE,
    })
    image!: string;

    @Column({
        type: DataType.STRING,
        field: Product.VAR_STOCK,
    })
    stock!: number;

    @Column({
        type: DataType.STRING,
        field: Product.VAR_PRICE,
    })
    price!: number;
}
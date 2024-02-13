import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";
import { Product } from "./Product";
import { Users } from "./Users";

@Table({
    tableName: Order.VAR_TABLE_NAME,
})
export class Order extends Model {
    public static VAR_TABLE_NAME = "order" as string;
    public static VAR_ID = "id" as string;
    public static VAR_PRODUCT_ID = "product_id" as string;
    public static VAR_USERS_ID = "user_id" as string;
    public static VAR_QTY = "qty" as string;
    public static VAR_TOTAL_PRICE = "total_price" as string;
    public static VAR_PRICE = "price" as string;
    public static VAR_ORDER_AT = "order_at" as string;

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: Order.VAR_ID,
    })
    id!: number;

    @Column({
        type: DataType.STRING(100),
        field: Order.VAR_PRODUCT_ID,
    })
    product_id!: string;

    @Column({
        type: DataType.STRING(255),
        field: Order.VAR_USERS_ID,
    })
    user_id!: string;

    @Column({
        type: DataType.STRING(255),
        field: Order.VAR_QTY,
    })
    qty!: number;

    @Column({
        type: DataType.STRING,
        field: Order.VAR_TOTAL_PRICE,
    })
    total_price!: number;

    @Column({
        type: DataType.DATE,
        field: Order.VAR_ORDER_AT,
    })
    order_at!: string;

    @BelongsTo(() => Product, "product_id")
	product!: Product;

    @BelongsTo(() => Users, "user_id")
	users!: Users;
}
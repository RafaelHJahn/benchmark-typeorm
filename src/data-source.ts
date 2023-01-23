import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserModel } from "./user.model";
import { UserAddressModel } from "./user-address.model";

// Local
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "securepassword",
    database: "poc",
    synchronize: true,
    logging: false,
    entities: [UserModel, UserAddressModel],
    migrations: [],
    subscribers: [],
});

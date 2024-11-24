import dotenv from "dotenv";

dotenv.config();

const config = {
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "Doorsense",
    connectionLimit: 5,
};

export default config;

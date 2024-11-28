import dotenv from "dotenv";

dotenv.config();
console.log(`DB Password: ${process.env.DB_PASSWORD}`);

const config = {
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "Doorsence",
    connectionLimit: 5,
};

export default config;

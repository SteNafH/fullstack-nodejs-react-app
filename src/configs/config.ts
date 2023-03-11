import dotenv from 'dotenv';

dotenv.config();

const Config = {
    NODE_ENV: process.env.NODE_ENV || 'dev',
    PORT: Number(process.env.PORT) || 5000,

    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASS: process.env.DB_PASS || '',
    DB_DATABASE: process.env.DB_DATABASE || '',
    DB_PORT: Number(process.env.DB_PORT) || 3306,
}

export default Config;

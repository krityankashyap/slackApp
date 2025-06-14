import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;

export const NODE_ENV = process.env.NODE_ENV || "Development"

export const DB_DEV_URL = process.env.DB_DEV_URL

export const DB_PROD_URL = process.env.DB_PROD_URL

import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;

export const NODE_ENV = process.env.NODE_ENV || "development";

export const DB_DEV_URL = process.env.DB_DEV_URL;

export const DB_PROD_URL = process.env.DB_PROD_URL;

export const JWT_SECRET = process.env.JWT_SECRET;

export const JWT_EXPIRY = process.env.JWT_EXPIRY || "1d";
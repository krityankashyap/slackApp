import mongoose from "mongoose";
import { DB_DEV_URL, DB_PROD_URL, NODE_ENV } from "./serverConfig.js";

export default async function connectDB(){

try {
  if(NODE_ENV == 'development'){
     await mongoose.connect(DB_DEV_URL);

  } else if(NODE_ENV == 'production'){

   await mongoose.connect(DB_PROD_URL);
  }
  console.log(`conected to mongoDB database from ${NODE_ENV} environment`);
} catch (error) {
  console.log("Error connecting to database", error);
}



}
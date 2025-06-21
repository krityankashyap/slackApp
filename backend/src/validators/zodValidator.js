import { StatusCodes } from "http-status-codes";
import { customErrorResponse } from "../utils/commons/responseObject.js";

export const validate = (schema) => {
  return async (req , res , next)=>{
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      console.log("zod validator error" , error);
      res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse({
        message: "Validation error",
        explanation: ""
      }));
    };
  };
};
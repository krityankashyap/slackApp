import { StatusCodes } from "http-status-codes";
import { customErrorResponse, internalResponse } from "../utils/commons/responseObject.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/serverConfig.js";
import userReopsitory from "../repositories/userRepository.js";

export const isAuthenticated = async (req , res , next) => {
  try {
    const token = req.headers['x-access-token'];

  if(!token){ // if token isn't present
    return res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse({
      explanation: "Invalid data send from the client",
      message: "No auth token provided"
    }))
  };
  // if the token is present
  const response = jwt.verify(token , JWT_SECRET);
 
  if(!response){ // if response isn't present
  return res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse({
    explanation: "Invalid data send from the client",
    message: "Invalid auth token provided from client"
  }))

  }

  // Now if token was present and validated then we have to get the details of the following users
  const user = await userReopsitory.getById(response.id);
  req.user = user.id;   // update the req.user with user.id;
  next();
  
  } catch (error) {
    console.log("Auth middleware error: ", error);

    if(error.name == "JsonWebTokenError"){  // If error name is JsonWebTokenError
      return res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse({
        explanation: "Invalid data send from the client",
        message: "Invalid auth token provided from client"
      }));
    };
    
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalResponse(error));
  };
};
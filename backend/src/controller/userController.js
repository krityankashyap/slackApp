import { StatusCodes } from "http-status-codes";
import { customErrorResponse, internalResponse, sucessResponse } from "../utils/commons/responseObject";
import { signUpService } from "../services/userService";

export const signup = async (req , res) => {
  try {
    const user = await signUpService(req.body);
      return res.status(StatusCodes.CREATED).json(sucessResponse(user , "user created successfully"));
    
  } catch(error){
    console.log("User controll error" , error);
    if(error.statusCode){ // if the error has statuscode already present
      return res.status(error.statusCode).json(customErrorResponse(error));
    };
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalResponse(error));
  };
};
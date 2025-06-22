import { StatusCodes } from "http-status-codes";
import { customErrorResponse, internalResponse, successResponse } from "../utils/commons/responseObject.js";
import { signInService, signUpService } from "../services/userService.js";

export const signup = async (req , res) => {
  try {
    const user = await signUpService(req.body);
      return res.status(StatusCodes.CREATED).json(successResponse(user , "user created successfully"));
    
  } catch(error){
    console.log("User controll error" , error);
    if(error.statusCode){ // if the error has statuscode already present
      return res.status(error.statusCode).json(customErrorResponse(error));
    };
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalResponse(error));
  };
};


export const signIn = async (req, res) => {
  console.log("SIGN-IN BODY:", req.body);

  try {
    const response = await signInService(req.body);
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'User signed in successfully'));
  } catch (error) {
    console.log('User controller error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalResponse(error));
  }
};
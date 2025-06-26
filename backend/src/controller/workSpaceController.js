import { StatusCodes } from "http-status-codes";
import { createWorkSpaceService, getWorkspaceUserIsMemberService } from "../services/workspaceService.js"
import { customErrorResponse, internalResponse, successResponse } from "../utils/commons/responseObject.js";

export const createWorkspaceController = async (req , res) => {
  console.log("workspace controller", req.body);
  try {
    const response = await createWorkSpaceService({
      ...req.body,
      owner: req.user
    });
    console.log(response);

    return res.status(StatusCodes.CREATED).json(successResponse(response , "Workspace created successfully"));
  } catch (error) {
    console.log("User controll error" , error);
    if(error.statusCode){ // if the error has statuscode already present
      return res.status(error.statusCode).json(customErrorResponse(error));
    };
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalResponse(error));
  }
};

export const getWorkspaceUserIsMemberController = async (req , res) => {
  try {
    console.log("workspace controller ",req.user);
    const response = await getWorkspaceUserIsMemberService(req.user);
    return res.status(StatusCodes.OK).json(successResponse(response , "Workspace fetched successfully"));
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalResponse(error));
  }
}
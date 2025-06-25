import { StatusCodes } from "http-status-codes";
import WorkspaceModel from "../schema/workSpaceSchema.js";
import ClientError from "../utils/errors/clientError.js";
import crudRepo from "./crudRepository.js";
import User from "../schema/user.js";

const workSpaceRepository = {
  ...crudRepo(WorkspaceModel),
  getworkspaceByName: async function (workspaceName) {
    const workspace = await WorkspaceModel.findById({
      name: workspaceName
    });

    if(!workspace){
      throw new ClientError({
        explanation: "Invalid data send from client",
        message: "No workspace find",
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    return workspace;

  },
  getworkspaceByJoincode: async function (joinCode) {
    const response = await WorkspaceModel.findById({
      joinCode: joinCode
    });

    if(!response){
      throw new ClientError({
        explation: "Invalid data send from client",
        message: "Invalid joinCode ",
        statusCode: StatusCodes.BAD_REQUEST
      });
    }

    return response;
  },
  addMembertoWorkspace: async function (workspaceId , memberId , role) {
    const workspace = await WorkspaceModel.findById(workspaceId);

    if(!workspace){
      throw new ClientError({
        explanation: "Invalid data send from client",
        message: "Workspace not found",
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    const isValidUser = await User.findById(memberId);

    if(!isValidUser){
      throw new ClientError({
        explanation: "Invalid data sent from client",
        message: "No user found",
        statusCode: StatusCodes.BAD_REQUEST
      });
    }

    const isUserAlreadyPartOfWorkspace = workspace.members.find((members) => members.memberId = memberId);

    if(!isUserAlreadyPartOfWorkspace){
      throw new ClientError({
        explanation: "Invalid data sent from client",
        message: "User already part of workspace",
        statusCode: StatusCodes.FORBIDDEN
      });
    }
    // now if workspace is present then inside the member array of WorkspaceModel we have to push memberid and role
    workspace.members.push({
      memberId,
      role
    });

    workspace.save(); // this function save the updated data

    return workspace
  },
  addChanneltoWorkspace: async function () {},
  fetchAllWorkspaceByMemberId: async function () {}
};

export default workSpaceRepository;
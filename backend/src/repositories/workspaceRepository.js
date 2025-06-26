import { StatusCodes } from "http-status-codes";
import WorkspaceModel from "../schema/workSpaceSchema.js";
import ClientError from "../utils/errors/clientError.js";
import crudRepo from "./crudRepository.js";
import User from "../schema/user.js";
import channelReopsitory from "./channelRepository.js";

const workSpaceRepository = {
  ...crudRepo(WorkspaceModel),
  getworkspaceByName: async function (workspaceName) {
    // Fixed: Use findOne instead of findById for name search
    const workspace = await WorkspaceModel.findOne({
      name: workspaceName
    });

    if(!workspace){
      throw new ClientError({
        explanation: "Invalid data sent from client",
        message: "No workspace found",
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    return workspace;
  },
  
  getworkspaceByJoincode: async function (joinCode) {
    // Fixed: Use findOne instead of findById for joinCode search
    const response = await WorkspaceModel.findOne({
      joinCode: joinCode
    });

    if(!response){
      throw new ClientError({
        explanation: "Invalid data sent from client", // Fixed typo: "explation" -> "explanation"
        message: "Invalid joinCode",
        statusCode: StatusCodes.BAD_REQUEST
      });
    }

    return response;
  },
  
  addMembertoWorkspace: async function (workspaceId, memberId, role) {
    const workspace = await WorkspaceModel.findById(workspaceId);

    if(!workspace){
      throw new ClientError({
        explanation: "Invalid data sent from client",
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

    // Fixed: Use === for comparison instead of = for assignment
    // Fixed: Convert ObjectId to string for proper comparison
    const isUserAlreadyPartOfWorkspace = workspace.members.find(
      (member) => member.memberId.toString() === memberId.toString()
    );

    // Fixed: Corrected logic - throw error if user IS already part of workspace
    if(isUserAlreadyPartOfWorkspace){
      throw new ClientError({
        explanation: "Invalid data sent from client",
        message: "User already part of workspace",
        statusCode: StatusCodes.FORBIDDEN
      });
    }
    
    // Add member to workspace
    workspace.members.push({
      memberId,
      role
    });

    // Fixed: Add await for save operation
    await workspace.save();

    return workspace;
  },
  
  addChanneltoWorkspace: async function (workspaceId, channelName) {
    const workSpace = await WorkspaceModel.findById(workspaceId).populate('channels');

    if(!workSpace){
      throw new ClientError({
        explanation: "Invalid data sent from client",
        message: "Workspace not found",
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isChannelAlreadyPartOfWorkspace = workSpace.channels.find(
      (channel) => channel.name === channelName
    );

    if(isChannelAlreadyPartOfWorkspace){
      throw new ClientError({
        explanation: "Invalid data sent from client",
        message: "Channel already exists in workspace",
        statusCode: StatusCodes.BAD_REQUEST
      });
    }

    // Create new channel
    const channel = await channelReopsitory.create({name: channelName});

    workSpace.channels.push(channel);
    await workSpace.save();

    return workSpace;
  },
  
  fetchAllWorkspaceByMemberId: async function (memberId) {
    const workspaces = await WorkspaceModel.find({
      'members.memberId': memberId
    }).populate('members.memberId', 'username email avatar');
    return workspaces;
  }
};

export default workSpaceRepository;
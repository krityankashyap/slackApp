import { v4 as uuidv4 } from "uuid";
import workSpaceRepository from "../repositories/workspaceRepository.js"


export const createWorkSpaceService = async (workSpaceData) => { // this workSpaceData doesn't consist of joinCode becoz joinCode is automatically generated not by any client or server so we have to create a joinCode and check whether is any workSpace have same joinCode or not
  const joinCode = uuidv4().substring(0 , 6);

  const workSpace = await workSpaceRepository.create({ // when the workSpace is created there should be atleast 1 channel in it + we should add the user as the current admin
    name: workSpaceData.name,
    description: workSpaceData.description, // Fixed typo: was "discription"
    joinCode
  }); 

  
  await workSpaceRepository.addMembertoWorkspace(
    workSpace._id,
    workSpaceData.owner,
    'admin'
  );

  const updatedWorkspace = await workSpaceRepository.addChanneltoWorkspace(
    workSpace._id,
    'general'
  )

  return updatedWorkspace;
};

export const getWorkspaceUserIsMemberService = async (userId) => {
  try {
    const response = await workSpaceRepository.fetchAllWorkspaceByMemberId(userId);
    return response;
  } catch (error) {
    console.log("Get workspace user is member of service" , error);
    throw error;
  }
}
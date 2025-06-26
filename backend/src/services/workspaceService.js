import { v4 as uuidv4 } from "uuid";
import workSpaceRepository from "../repositories/workspaceRepository.js"

export const createWorkSpaceService = async (workSpaceData) => {
  const joinCode = uuidv4().substring(0, 6);
  console.log("Workspace service", workSpaceData);
  
  const workSpace = await workSpaceRepository.create({
    name: workSpaceData.name,
    description: workSpaceData.description, // Fixed typo: was "discription"
    joinCode
  }); 

  // Fixed: Use workSpace instead of response
  await workSpaceRepository.addMembertoWorkspace(
    workSpace._id,
    workSpaceData.owner,
    'admin'
  );

  await workSpaceRepository.addChanneltoWorkspace(
    workSpace._id,
    'general'
  )

  return workSpace;
}
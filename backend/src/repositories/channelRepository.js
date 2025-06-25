import ChannelModel from "../schema/Channel-groupSchema.js";
import crudRepo from "./crudRepository.js";

const channelReopsitory = {
  ...crudRepo(ChannelModel), // destructure the crudRepo with User model

  
}

export default channelReopsitory;


import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  body: {
    type: String,
    required: [true , "message body is required"]
  },

  image: {
    type: String
  },

  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
    required: [true , "channelId is required"]
  },

  senderId : {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: [true , "SenderId is required"]
  },
  
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace",
    required: [true,"workSpace Id is required"],
  }
});

const messageModel = mongoose.model("Message" , messageSchema);

export default messageModel;
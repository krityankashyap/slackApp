import mongoose from "mongoose";

const workSpaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Workspace name is required"],
    unique: true
  },
  description: { 
    type: String
  },
  members: [
    {
      memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      role: {
        type: String,
        enum: ["admin", "member"], // Fixed: "Admin" -> "admin" for consistency
        default: "member",
      },
    }
  ],
  joinCode: {
    type: String,
    required: [true, "joinCode is necessary"], // Fixed typo: "neccessary" -> "necessary"
  },
  channels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel"
    }
  ]
});

const WorkspaceModel = mongoose.model("Workspace", workSpaceSchema);

export default WorkspaceModel;
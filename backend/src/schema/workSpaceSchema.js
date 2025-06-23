import mongoose from "mongoose";

const workSpaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true , "Workspace name is required"],
    unique: true
  },
  description: {
    type: String
  },
  members: [ // this is an array of object for members where it has memberId references from "User-table" and role of member 
    {
      memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      role: {
        type: String,
        enum: ["Admin" , "member"],
        default: "member",
      },
    }
  ],
  joinCode: {
    type: String,
    required: [true, "joinCode is neccessary"], // when u join discord through links u touch a joinCode
  },
  channels: [ // this is an array of object for member where it hs channelId references from "Channel-table"
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel"
    }
  ]
});

const ChannelModel = mongoose.model("Workspace" , workSpaceSchema)
import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
 name: {
  type : String,
  require: [true , 'Channel name is required']
 },
} ,
 {timestamps: true});

 const ChannelModel = mongoose.model('Channel' , channelSchema);

 export default ChannelModel;
import User from "../schema/user.js";
import crudRepo from "./crudRepository.js";

const userReopsitory = {
  ...crudRepo(User), // destructure the crudRepo with User model

  getByEmail: async function (email){
    const result = await User.findOne({ Useremail: email });
    return result;
  },
  
  getByUsername: async function (name){
    const result = await User.findOne({Username: name}).select('-password'); // exclude password everytime while fetching this function
    return result;
  },
}

export default userReopsitory;


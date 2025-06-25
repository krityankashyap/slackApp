import { StatusCodes } from "http-status-codes";
import userRepository from "../repositories/userRepository.js"
import ClientError from "../utils/errors/clientError.js";
import ValidationError from "../utils/errors/validationError.js";
import bcrypt from "bcrypt"
import { createJWT } from "../utils/commons/authUtils.js";

export const signUpService = async (data)=>{
  console.log("Signup service ",data)
  try {
    const newUser = await userRepository.create(data);
    return newUser;
  } catch (error) {
    console.log("User Service error", error);

    if(error.name == 'ValidationError'){
      throw new ValidationError({
        error: error.errors, // inside this error methods there is a errors property which is kind of like a object which puts all the errors in cage
      },
        error.message);
    };

   if(error.name == 'MongoServerError' && error.code == 11000){
    throw new ValidationError({
      error: ["A user with same email and username already exists"],
    },
     "A user with same email and username already exists" )
   }
  }
  
};



export const signInService = async (data)=>{
  try {
    const user = await userRepository.getByEmail(data.email);

    if(!user){ // if user isn't present i.e, the email that is provided isn't registered on the platform and this isn't validation error this is client error
    throw new ClientError({
      explanation: "Invalid email send by client",
      message: "No registered user found with this email",
      statusCodes: StatusCodes.NOT_FOUND
    })
    };
    // after this we have to matched the password with the hased password
   const isMatched = bcrypt.compareSync(data.password , user.password);

   if(!isMatched){
    throw new ClientError({
      explanation: "Invalid email send by client",
      message: "Password is incorrect",
      statusCodes: StatusCodes.BAD_REQUEST
    })
   };

   // if password and email both r correct then we have to send the token
   return {
    username: user.username,
    avatar: user.avatar,
    email: user.email,
    _id: user._id,
    token: createJWT({id: user._id , email: user.email}) 
   }


  } catch (error) {
    console.log("signIn error" , error);
    throw error
  }
 
}
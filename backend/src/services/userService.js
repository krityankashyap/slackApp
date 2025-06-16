import userReopsitory from "../repositories/userRepository"
import ValidationError from "../utils/errors/validationError";

export const signUpService = async (data)=>{
  try {
    const newUser = await userReopsitory.create(data);
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
  
}
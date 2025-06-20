import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: [true, "Email already required"],
    required: [true, "Email is required"],
    match: [
      // eslint-disable-next-line no-useless-escape
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username already exists"],
    match: [
      /^[a-zA-Z0-9]+$/,
      'Username must contain only letters and numbers'
    ]
  },
  avatar: {
    type: String,
  }
}, 
  
  { timestamps: true });

userSchema.pre('save' , function saveUser(next){
  const user = this;
  const SALT = bcrypt.genSaltSync(9);
  const hasedPassword = bcrypt.hashSync(user.password , SALT);
  user.password= hasedPassword;
  user.avatar = `https://robohash.org/${user.username}`; // Added robohash for db
  next();
});

const User = mongoose.model('User' , userSchema);

export default User;
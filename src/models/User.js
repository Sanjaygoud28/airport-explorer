import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// Mongoose schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  displayName: {
    type: String,
    // required: true,
    trim: true
  },
  password :{
    type : String,
    required : true,
    

  },
  role: {
    type: String,
    required: true,
    default: "user",  // everyone signs up as a normal user by default
    enum: [ 'admin', 'user']
  },
  refreshToken : {
    type : String,
    default : null
  }
}, {
  timestamps: true
},
);


userSchema.pre("save", async function () {
  
  if(!this.isModified("password")){
    return
  }
  this.password = await bcrypt.hash(this.password,10)
})


const User = mongoose.model('User', userSchema);

export default User;
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const crypto = require("crypto")

// Define the schema
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required:[true,"first_Name is required "],
    maxLength:[200,"first_Name cannot exceed 200 characters "],
    trim: true
  },
  last_name: {
    type: String,
    required: [true,"last_name is required "],
    maxLength:[200,"last_Name cannot exceed 200 characters "],
    trim: true
  },
  email: {
    type: String,
    required: [true," email is required unique"],
    unique: [true,"email should be unique"],
  },
  password: {
    type: String,
    minLength : [8 , "password must be minimum length of 8 characters "],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken : String,
  resetPasswordExpire : Date,
});


// before password save
userSchema.pre("save" , async function  (next) {
  if (!this.isModified("password")) {
      next();  
  }
  this.password = await bcrypt.hash(this.password , 10)
} )

// compare password
userSchema.methods.comparePassword = async function (enteredPassword){
  // console.log("comparePassword run");
  return await bcrypt.compare(enteredPassword , this.password  )
}




// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = async function (){
  // generatong Token
  const resetToken = crypto.randomBytes(20).toString("hex");
  console.log("resetToken model " , resetToken);

  // hashing and adding resetPasswordToken to userschema
  this.resetPasswordToken = crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex")
  console.log("resetPasswordToken model " , this.resetPasswordToken );

  this.resetPasswordExpire = Date.now() + 5*60*1000;
  return resetToken ; 
}



// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
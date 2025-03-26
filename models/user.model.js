//User se trong nhu the nay:
/*
  [
    {
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'password123'
    }
  ]
*/
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: [true, 'Username is required'],
    trim: true,
    minLength: 2,
    maxLength: 50,
  },
  email: {
    type: String, 
    required: [true, 'User email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please fill in a valid email address']
  },
  password: {
    type: String, 
    required: [true, 'Password is required'],
    minLength: 8,
  }
}, /* options */{timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;

//User.create({}); // lệnh này sẽ tạo các người mới đăng kí/đnhap?.
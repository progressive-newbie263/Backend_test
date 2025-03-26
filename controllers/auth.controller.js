//request body là 1 object, chứa data gửi từ phía client (thường là POST)
//import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";


// function này tạo 1 user mới (ĐĂNG KÍ.)
//DONE
export const signUp = async (req, res, next) => {
  //JSON.parse(undefined); 
  //const session = await mongoose.startSession();
  //session.startTransaction();

  // logic xử lí sign up. Ta sẽ tạo user mới bằng đoạn này.
  try {
    console.log("Hello NodeJS");
    const { name, email, password } = req.body;

    /*
      check xem user da ton tai ? findOne trong mongodb trả về 1 giá trị hợp lệ
      yêu cầu. Nếu email được đki đã tồn tại (tức đã có người dùng email ấy)
      thì trả về lỗi 409 ngay lập tức (409 = đã tồn tại).
    */
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      const err = new Error("Email already in use");
      err.statusCode = 409;
      throw err;
    }

    //hash password. Salt là 1 cái chuyên để đặt độ phức tạp 
    // của pass trong quá trình tạo pass ấy. 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //thêm {session} vào cuối để nếu có gì bị sai thì nó sẽ huỷ, ko tạo user nữa.
    const newUsers = await User.create([{ name, email, password: hashedPassword }] /*,{session}*/);
    const token = jwt.sign({ userId: newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN}); 

    //await session.commitTransaction();
    //session.endSession();

    //status
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: newUsers[0],
      }
    });
  } catch (err) {
    // lệnh này để khi ở 1 giai đoạn nào đó, nếu có gì sai xảy ra
    // nó tự động ngắt transaction ngay lập tức + trả về lỗi.
    //await session.abortTransaction();
    //session.endSession();
    next(err);
  }
}

// tập trung xử lí logic phần sign in tại đây.
//DONE. Khi tài khoản ko tồn tại ==>user not found. còn nếu sai mật khẩu, trả về lỗi password
export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //ko tim thay user: => 404 (tài nguyên được yêu cầu ko tồn tại)
    const user = await User.findOne({ email });
    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }
    
    //password check: => 401 (yêu cầu bị từ chối do thiếu xác thực hợp lệ)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const err = new Error("Password is not valid, please try again.");
      err.statusCode = 401;
      throw err;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

    res.status(200).json({
      success: true,
      message: "User sign in successfully",
      data: {
        token,
        user
      }
    })
  } catch (error) {
    next(error);
  }
}

// tập trung xử lí logic phần sign out tại đây.
export const signOut = async (req, res, next) => {}
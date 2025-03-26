import User from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

export const getUser = async (req, res, next) => {
  try {
    //chọn tất cả các field, trừ password ra.
    const user = await User.findById(req.params.id).select('-password');

    if(!user) {
      const err = new Error('User not found');
      err.statusCode = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}
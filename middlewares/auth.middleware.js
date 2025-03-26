/*
  + function này chịu trách nhiệm bảo mật. Tức là, với các thông tin cá nhân của người
  dùng, sẽ chỉ có 1 vài nguồn có thể xem được (admin, chính user đó)

  + Nguyen li hoat dong:
  -----------------------------------------------------------------------------
  making request (Ex: get user details) => authorize middleware => verify 
  if verify is valid => next step => get User details.
*/

import { JWT_SECRET } from '../config/env.js';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const authorize = async (req, res, next) => {
  try {
    let token;

    //khi pass 1 token, thì từ khởi đầu mỗi request sẽ luôn là 'Bearer'.
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      //lệnh này sẽ lấy token từ header, và chỉ lấy phần tử thứ 2 (tức sẽ bỏ qua Bearer?)
      token = req.headers.authorization.split(' ')[1];
    }
    if(!token) {
      return res.status(401).json({ message: 'Unauthorized'});
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if(!user) {
      return res.status(404).json({ message: 'Unauthorized'});
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Unauthorized',
      error: error.message,
    })
  }
}

export default authorize;
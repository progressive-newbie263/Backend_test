/*
  -----------------------NGUYÊN LÝ HOẠT ĐỘNG (ĐKI DỊCH VỤ)------------------------

  bước 1: Tạo 1 subscription

  bước 2: Check thời hạn để tái đăng kí dịch vụ (middleware làm trung gian kiểm chứng)
  
  (bước 3 - optional): Có thể tạo tiếp 1 middleware check lỗi nữa.

  bước 4: Sau khi đảm bảo cả 2 middleware sang status tiếp theo, ta mới điều hướng
  sang controller.
*/


const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };

    error.message = err.message;
    console.error(err);

    //mongoose bad ObjectId
    if (err.name === 'CastError') {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new Error(message);
      error.statusCode = 404;
    }

    //mongoose duplicate key: '11000', code này xảy ra khi key bị lặp
    if (err.code === 11000) {
      const message = 'Duplicate field value entered';
      error = new Error(message);
      error.statusCode = 400;
    }

    //mongoose, lỗi xác thực (validation error)
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map(val => val.message);
      error = new Error(message.join(', '));
      error.statusCode = 400;
    }

    //ko tồn tại thì trả về lỗi 500/server
    //res.status, ko phải res.statusCode
    res.status(error.statusCode || 500).json({ success: false, error: error.message || 'Server Error' });
  } catch (err) {
    next(err);
  }
}

export default errorMiddleware;
const User = require("../../models/user.model");

// Middleware để thêm thông tin người dùng vào req.user và res.locals.user
module.exports.infoUser = async (req, res, next) => {
  try {
    if (req.cookies.tokenUser) {
      const user = await User.findOne({
        tokenUser: req.cookies.tokenUser,
        deleted: false, // Đảm bảo tài khoản chưa bị xóa
      });

      if (user) {
        req.user = user; // Gán thông tin người dùng vào req.user
        res.locals.user = user; // Gán thông tin người dùng vào res.locals.user (để sử dụng trong view)
      }
    }
    next();
  } catch (error) {
    console.error("Error in infoUser middleware:", error);
    next(error); // Tiếp tục chuyển lỗi đến middleware tiếp theo (nếu có)
  }
};

// Middleware để yêu cầu người dùng đã xác thực
module.exports.requireAuth = async (req, res, next) => {
  try {
    // Kiểm tra xem tokenUser có trong cookies không
    if (!req.cookies.tokenUser) {
      console.warn("No token found in cookies");
      return res.redirect("/user/login");
    }

    // Tìm người dùng dựa trên token
    const user = await User.findOne({
      tokenUser: req.cookies.tokenUser,
      deleted: false, // Đảm bảo tài khoản chưa bị xóa
    });

    if (!user) {
      console.warn("User not found or token is invalid");
      return res.redirect("/user/login");
    }

    // Gán thông tin người dùng vào req.user
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in requireAuth middleware:", error);
    next(error); // Tiếp tục chuyển lỗi đến middleware tiếp theo (nếu có)
  }
};

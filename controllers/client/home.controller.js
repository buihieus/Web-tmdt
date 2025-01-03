const User = require("../../models/user.model");

// [GET] /home
module.exports.index = async (req, res) => {
    // Kiểm tra xem người dùng có đăng nhập không
    const user = req.session.userId ? await User.findById(req.session.userId) : null;

    res.render('client/pages/home/index', {
        pageTitle: "Trang chủ",
        user: user // Truyền biến user vào view
    });
};
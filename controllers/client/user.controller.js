const md5 = require("md5");

const User = require("../../models/user.model");
// const ForgotPassword = require("../../models/forgot-password.model");

// const generateHelper = require("../../helpers/generate.helper");
// const sendEmailHelper = require("../../helpers/sendEmail.helper");

// [GET] /user/register
module.exports.register = async (req, res) => {
  res.render("client/pages/user/register", {
    pageTitle: "Đăng ký tài khoản",
  });
};
// [POST] /user/register
module.exports.registerPost = async (req, res) => {
    try {
        console.log(req.body);

        // Kiểm tra xem người dùng đã tồn tại
        const existUser = await User.findOne({
            email: req.body.email,
            deleted: false
        });

        console.log(existUser);

        if (existUser) {
            req.flash("error", "Email đã tồn tại!");
            return res.redirect("back"); // Dừng lại sau khi redirect
        }

        // Mã hóa mật khẩu
        req.body.password = md5(req.body.password);

        // Tạo một instance người dùng mới
        const newUser = new User({
            fullName: req.body.fullName, // Giả sử bạn có trường fullName trong req.body
            email: req.body.email,
            password: req.body.password,
            // Thêm các trường khác nếu cần
        });

        // Lưu người dùng mới vào cơ sở dữ liệu
        await newUser.save();

        console.log(newUser);

        res.cookie("tokenUser", newUser.tokenUser);
        req.flash("success", "Đăng ký tài khoản thành công!");
        res.redirect("/");
    } catch (error) {
        console.error(error);
        req.flash("error", "Đã xảy ra lỗi, vui lòng thử lại!");
        res.redirect("back");
    }
};

// [GET] /user/login
module.exports.login = async (req, res) => {
    res.render("client/pages/user/login", {
        pageTitle: "Đăng nhập tài khoản",
    });
};

// [POST] /user/login
module.exports.loginPost = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Tìm người dùng trong cơ sở dữ liệu
        const user = await User.findOne({ email, deleted: false });

        // Kiểm tra xem người dùng có tồn tại không
        if (!user) {
            req.flash("error", "Email không tồn tại!");
            return res.redirect("back");
        }

        // Kiểm tra mật khẩu (sử dụng phương thức tốt hơn cho mật khẩu)
        const isPasswordValid = user.password === md5(password);
        if (!isPasswordValid) {
            req.flash("error", "Mật khẩu không chính xác!");
            return res.redirect("back");
        }

        // Đăng nhập thành công, lưu thông tin người dùng vào session
        req.session.userId = user._id; // Lưu ID người dùng vào session
        req.flash("success", "Đăng nhập thành công!");

        // Thêm cookie với token người dùng (nếu cần)
        if (user.tokenUser) {
            res.cookie("tokenUser", user.tokenUser, {
                httpOnly: true, // Đảm bảo cookie chỉ có thể truy cập từ phía server
                secure: process.env.NODE_ENV === "production", // Chỉ sử dụng cookie qua HTTPS trong môi trường sản xuất
                maxAge: 24 * 60 * 60 * 1000 // Thời gian sống của cookie (1 ngày)
            });
        }
        req.flash("success", "Đăng ký tài khoản thành công!");
        // Redirect đến trang chính hoặc dashboard
        return res.redirect("/");

    } catch (error) {
        console.error("Login error:", error);
        req.flash("error", "Đã xảy ra lỗi, vui lòng thử lại!");
        return res.redirect("back");
    }
};

// [GET] /user/logout
module.exports.logout = async (req, res) => {
    req.session.destroy(); // Xóa session
    res.clearCookie("tokenUser"); // Xóa cookie
    res.redirect("/");
}
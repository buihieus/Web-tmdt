module.exports.registerPost = async (req, res, next) => {
    const { fullName, password, email } = req.body; // Sử dụng destructuring để dễ dàng truy cập

    // Kiểm tra các trường bắt buộc
    if (!fullName) {
        req.flash("error", "Vui lòng nhập họ tên!");
        return res.redirect("back"); // Thoát ngay sau khi redirect
    }

    if (!password) {
        req.flash("error", "Vui lòng nhập mật khẩu!");
        return res.redirect("back");
    }

    if (!email) {
        req.flash("error", "Vui lòng nhập email!");
        return res.redirect("back");
    }

    // Nếu tất cả các trường hợp đều hợp lệ, tiếp tục xử lý
    next();
};

module.exports.loginPost = async (req, res, next) => {
    const {  password, email } = req.body; // Sử dụng destructuring để dễ dàng truy cập

    if (!password) {
        req.flash("error", "Vui lòng nhập mật khẩu!");
        return res.redirect("back");
    }

    if (!email) {
        req.flash("error", "Vui lòng nhập email!");
        return res.redirect("back");
    }

    // Nếu tất cả các trường hợp đều hợp lệ, tiếp tục xử lý
    next();
};
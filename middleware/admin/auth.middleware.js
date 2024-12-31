const systemConfig = require("../../config/system");
const Account = require("../../models/account.model");

module.exports.requireAuth = async (req, res, next) => {
    // Kiểm tra xem token có tồn tại trong cookies không
    if (!req.cookies.token) {
        // Nếu không có token và đang ở trang đăng nhập, cho phép truy cập
        if (req.path === `${systemConfig.prefixAdmin}/auth/login`) {
            return next();
        }
        // Chuyển hướng đến trang đăng nhập
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
        return;
    } else {
        // Tìm tài khoản tương ứng với token
        const user = await Account.findOne({ token: req.cookies.token });
        if (!user) {
            // Nếu không tìm thấy user, chuyển hướng đến trang đăng nhập
            if (req.path === `${systemConfig.prefixAdmin}/auth/login`) {
                return next();
            }
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
            return;
        } else {
            // Nếu có user, tiếp tục với middleware tiếp theo
            next();
        }
    }
}
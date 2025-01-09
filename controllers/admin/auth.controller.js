const Account = require("../../models/account.model");
const systemConfig = require("../../config/system");
const md5 = require("md5");
//[GET] /admin/auth/login
module.exports.login = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (token) {
      const user = await Account.findOne({ token });
      if (user) {
        return res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
      }
    }
    res.render("admin/pages/auth/login", {
      pageTitle: "Đăng nhập",
    });
  } catch (error) {
    console.error("Error in login function:", error);
    res.status(500).send("Internal Server Error");
  }
};
//[POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = md5(req.body.password);
  const user = await Account.findOne({
    email: email,
    deleted: false,
  });
  if (!user) {
    req.flash("error", "Email không tồn tại");
    res.redirect("back");
    return;
  }
  if (user.password != password) {
    req.flash("error", "Mật khẩu không chính xác");
    res.redirect("back");
    return;
  }
  if (user.status != "active") {
    req.flash("error", "Tài khoản đã bị khóa");
    res.redirect("back");
    return;
  }
  res.cookie("token", user.token);
  res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
};
//[GET] /admin/auth/logout
module.exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  };

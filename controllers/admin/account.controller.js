const Account = require("../../models/account.model");
const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");
const md5 = require("md5");
// [GET] admin/accounts
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Account.find(find).select("-password -token");
  for (const record of records) {
    const role = await Role.findOne({
      deleted: false,
      _id: record.role_id,
    });
    record.role = role;
  }
  res.render("admin/pages/account/index", {
    titlePage: "Danh sách tài khoản",
    records: records,
  });
};
// [GET] admin/accounts/create
module.exports.create = async (req, res) => {
  const record = await Role.find({
    deleted: false,
  });
  res.render("admin/pages/account/create", {
    titlePage: "Danh sách tài khoản",
    roles: record,
  });
};
// [POST] admin/accounts/create
module.exports.createPost = async (req, res) => {
  const emailExists = await Account.findOne({
    email: req.body.email,
    deleted: false,
  });
  if (emailExists) {
    req.flash("error", `Email ${req.body.email} đã tồn tại`);
    res.redirect("back");
  } else {
    req.body.password = md5(req.body.password);
    const account = new Account(req.body);
    await account.save();
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};
// [GET] admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const record = await Account.findOne({
      deleted: false,
      _id: req.params.id,
    });
    const roles = await Role.find({
      deleted: false,
    });
    res.render("admin/pages/account/edit", {
      titlePage: "Chỉnh sửa tài khoản",
      roles: roles,
      record: record,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};
// [PATCH] admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  const emailExists = await Account.findOne({
    _id: {$ne: id},
    email: req.body.email,
    deleted: false,
  });
  if (emailExists) {
    req.flash("error", `Email ${req.body.email} đã tồn tại`);
  } else {
    if (req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }
    await Account.updateOne({ _id: id }, req.body);

    req.flash("success", "Cập nhật tài khoản thành công");
  }

  res.redirect("back");
};

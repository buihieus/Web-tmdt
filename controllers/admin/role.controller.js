const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");

//[GET] /admin/roles
module.exports.index = async (req, res) => {
  try {
    // Lọc các nhóm quyền chưa bị xóa
    let find = {
      deleted: false, // Chỉ lấy các quyền chưa bị xóa
    };

    // Tìm danh sách quyền trong cơ sở dữ liệu
    const records = await Role.find(find);

    // Truyền dữ liệu sang view để hiển thị
    res.render("admin/pages/roles/index", {
      pageTitle: "Nhóm quyền",
      records: records,
    });
  } catch (error) {
    req.flash("error", "Đã có lỗi xảy ra khi tải danh sách nhóm quyền");
    res.redirect(systemConfig.prefixAdmin);
  }
};
//[GET] /admin/roles/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/roles/create", {
    pageTitle: "Tạo nhóm quyền",
  });
};

//[POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
  const record = new Role(req.body);
  await record.save();

  res.redirect(`${systemConfig.prefixAdmin}/roles`);
};

//[GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    let find = {
      _id: id,
      deleted: false,
    };
    const record = await Role.findOne(find);

    res.render("admin/pages/roles/edit", {
      pageTitle: "Sửa nhóm quyền",
      data: record
    });
  } catch (error) {
    req.flash("error", "Đã có lỗi xảy ra");
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
};

//[PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  await Role.updateOne({_id: id}, req.body)

  req.flash("success", "Cập nhật nhóm quyền thành công");

  res.redirect("back");
};

//[GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
  let find = {
    deleted: false
  }
  const records = await Role.find(find);
  res.render("admin/pages/roles/permissions", {
    pageTitle: "Phân quyền",
    records: records
  });
};

//[PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
  const permissions = JSON.parse(req.body.permissions);
  for (const item of permissions) {
    await Role.updateOne({_id: item.id}, {permissions: item.permissions});
  }
  req.flash("success", "Cập nhật phân quyền thành công");
  res.redirect("back");
};

// //[POST] /admin/roles/delete/:id
// module.exports.delete = async (req, res) => {
//   try {
//     const id = req.params.id;
//     await Role.updateOne({ _id: id }, { deleted: true }); // Đánh dấu quyền là đã xóa (soft delete)
//     req.flash("success", "Xóa nhóm quyền thành công");
//     res.redirect(`${systemConfig.prefixAdmin}/roles`);
//   } catch (error) {
//     req.flash("error", "Đã có lỗi xảy ra khi xóa nhóm quyền");
//     res.redirect(`${systemConfig.prefixAdmin}/roles`);
//   }
// };

// [POST] /admin/roles/delete-permanent/:id
module.exports.deletePermanent = async (req, res) => {
  try {
    const id = req.params.id;

    // Xóa vĩnh viễn nhóm quyền khỏi cơ sở dữ liệu
    await Role.deleteOne({ _id: id });

    req.flash("success", "Xóa vĩnh viễn nhóm quyền thành công");
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  } catch (error) {
    req.flash("error", "Đã có lỗi xảy ra khi xóa nhóm quyền");
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
};



const Category = require("../../models/category.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helpers/createTree");
// [GET] /admin/category
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  //Tìm kiếm theo status
  if (req.query.status) {
    find.status = req.query.status;
  }
  const filterStatus = filterStatusHelper(req.query);
  //Tìm kiếm theo tên
  const search = searchHelper(req.query);
  if (search.regex) {
    find.title = search.regex;
  }
  const records = await Category.find(find);
  const newRecords = createTreeHelper.tree(records);
  res.render("admin/pages/category/index", {
    pageTitle: "Danh mục sản phẩm",
    records: newRecords,
    filterStatus: filterStatus,
    keywords: search.keywords,
    // pagination: objectPagination
  });
};

// [GET] /admin/categoy/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };
  // Lấy danh mục cha và con tương ứng
  const records = await Category.find(find);
  const newRecords = createTreeHelper.tree(records);
  console.log(newRecords);
  res.render("admin/pages/category/create", {
    pageTitle: "Tạo danh mục sản phẩm",
    records: newRecords,
  });
};

// [POST] /admin/categoy/create
module.exports.createPost = async (req, res) => {
  if (req.body.position == "") {
    const countCategorys = await Category.countDocuments();
    req.body.position = countCategorys + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  const category = new Category(req.body);
  await category.save();
  res.redirect(`${systemConfig.prefixAdmin}/category`);
};

//[GET] /admin/category/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const data = await Category.findOne({
      _id: req.params.id,
      deleted: false,
    });
    const records = await Category.find({
      deleted: false,
    });
    const newRecords = createTreeHelper.tree(records);
    res.render("admin/pages/category/edit", {
      pageTitle: "Chỉnh sửa danh mục sản phẩm",
      data: data,
      records: newRecords,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/category`);
  }
};

//[PATCH] /admin/category/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  req.body.position = parseInt(req.body.position);
  await Category.update({ _id: id }, req.body);
  res.redirect("back");
};

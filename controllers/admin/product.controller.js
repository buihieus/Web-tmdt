const Product = require("../../models/product.model");
const Category = require("../../models/category.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helpers/createTree");

const fs = require('fs');
const csv = require('csv-parser')

// [GET] /admin/products
module.exports.index = async (req, res) => {
  //req.query dùng để lấy các tham số trên URL sau dấu ?
  // console.log(req.query);
  const filterStatus = filterStatusHelper(req.query);
  // console.log(filterStatus);
  let find = {
    deleted: false,
  };

  //Tìm kiếm theo status
  if (req.query.status) {
    find.status = req.query.status;
  }
  //Tìm kiếm theo tên
  const search = searchHelper(req.query);
  if (search.regex) {
    find.title = search.regex;
  }

  //Pagination
  const countProducts = await Product.countDocuments(find);
  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4,
    },
    req.query,
    countProducts
  );
  //End Pagination

  //Sort
  let sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue
  } else {
    sort.position = "desc";
  }
  //End sort
  const products = await Product.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);
  // console.log(products);
  res.render("admin/pages/product/index", {
    pageTitle: "Trang sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keywords: search.keywords,
    pagination: objectPagination
  });
};

//[PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  //req.params dùng để lấy các routes động trên url (sau dấu :)
  const id = req.params.id;
  const status = req.params.status;

  await Product.updateOne({ _id: id }, { status: status });

  req.flash("success", "Cập nhật trạng thái thành công");

  res.redirect("back");
};

//[PATCH] /admin/products/change-multi
module.exports.changeMultiStatus = async (req, res) => {
  //req.body Dùng để lấy dữ liệu được gửi trong thân của một yêu cầu HTTP POST, PUT, hoặc PATCH.
  console.log(req.body);
  const type = req.body.type;
  const ids = req.body.ids.split(", ");

  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash(
        "success",
        `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`
      );
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash(
        "success",
        `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`
      );
      break;
    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deletedAt: new Date() }
      );
      req.flash("success", `Đã xóa thành công ${ids.length} sản phẩm!`);
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Product.updateOne({ _id: id }, { position: position });
      }
      req.flash("success", `Đã đổi vị trí thành công ${ids.length} sản phẩm!`);
      break;
    default:
      break;
  }
  res.redirect("back");
};

//[DELETE] /admin/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  try {
    await Product.deleteOne({ _id: id }); // Xóa sản phẩm trong database
    req.flash("success", "Đã xóa thành công sản phẩm!");
  } catch (error) {
    req.flash("error", "Xóa sản phẩm thất bại!");
    console.log(error);
  }

  res.redirect("back");
};


//[GET] /admin/products/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false
  };
  const category = await Category.find(find);
  const newCategory = createTreeHelper.tree(category);
  res.render("admin/pages/product/create", {
    pageTitle: "Thêm mới sản phẩm",
    category: newCategory
  });
};

//[POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);

  if (req.body.position == "") {
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  const product = new Product(req.body);
  await product.save();
  res.redirect(`${systemConfig.prefixAdmin}/products`);
};

//[GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
    let find = {
      deleted: false,
      _id: req.params.id,
    };
    const category = await Category.find({
      deleted: false
    });
    const newCategory = createTreeHelper.tree(category);
    const product = await Product.findOne(find);
    res.render("admin/pages/product/edit", {
      pageTitle: "Chỉnh sửa sản phẩm",
      product: product,
      category: newCategory
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};

//[PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseFloat(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);
  
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`; //Lưu link ảnh vào database
  }
  // console.log(req.body);
  try {
    await Product.updateOne({_id: id}, req.body);
    req.flash("success","Đã cập nhật thành công!");
  } catch (error) {
    req.flash("error","Cập nhật thất bại!");
    console.log(error);
  }
  res.redirect("back");
};

//[GET] /admin/products/details/:id
module.exports.details = async (req, res) => {
  try {
    let find = {
      deleted: false,
      _id: req.params.id,
    };

    const product = await Product.findOne(find);
    res.render("admin/pages/product/details", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};

module.exports.uploadCSV = async (req, res) => {
  const results = [];

  // Đảm bảo có tệp được tải lên
  if (!req.file) {
    req.flash("error", "Không có tệp nào được tải lên!");
    return res.redirect("back"); // Chỉ gọi duy nhất một lần
  }

  // Đọc tệp CSV
  const stream = fs.createReadStream(req.file.path)
    .pipe(csv());

  stream.on('data', (data) => {
    // Kiểm tra các trường bắt buộc
    if (!data.title || !data.price || isNaN(data.price)) {
      // Gọi res.redirect chỉ một lần và ngừng xử lý
      req.flash("error", "Tệp CSV không hợp lệ! Thiếu trường bắt buộc!");
      stream.destroy(); // Dừng stream
      return res.redirect("back");
    }

    // Thêm các trường cần thiết vào kết quả
    results.push({
      title: data.title, // Tên sản phẩm
      description: data.description || "", // Mô tả sản phẩm
      price: parseFloat(data.price), // Giá sản phẩm
      discountPercentage: parseFloat(data.discountPercentage) || 0, // Phần trăm giảm giá
      stock: parseInt(data.stock) || 0, // Số lượng tồn kho
      thumbnail: data.thumbnail || "", // Hình ảnh sản phẩm
      status: data.status || "active", // Trạng thái sản phẩm
      position: parseInt(data.position) || 0, // Vị trí sản phẩm
      // Bạn có thể thêm các trường khác nếu cần
    });
  });

  stream.on('end', async () => {
    // Lưu tất cả sản phẩm vào database
    try {
      for (const item of results) {
        const product = new Product(item);
        await product.save();
      }
      req.flash("success", "Đã thêm sản phẩm từ tệp CSV thành công!");
      res.redirect(`${systemConfig.prefixAdmin}/products`); // Chỉ gọi một lần
    } catch (error) {
      req.flash("error", "Có lỗi xảy ra khi thêm sản phẩm từ tệp CSV!");
      console.log(error);
      res.redirect("back"); // Chỉ gọi một lần
    }
  });

  stream.on('error', (error) => {
    req.flash("error", "Có lỗi xảy ra khi đọc tệp CSV!");
    console.log(error);
    res.redirect("back"); // Chỉ gọi một lần
  });
};
const Products = require("../../models/product.model");

// [GET] /home
module.exports.babyg = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Trang hiện tại (mặc định là trang 1)
  const limit = 8; // Số sản phẩm mỗi trang
  const skip = (page - 1) * limit; // Bỏ qua số sản phẩm của các trang trước

  // Lấy tổng số sản phẩm
  const totalProducts = await Products.countDocuments({
    deleted: false,
    brand: "baby-g",
    status: "active",
  });

  // Lấy danh sách sản phẩm cho trang hiện tại
  const babyg = await Products.find({
    deleted: false,
    brand: "baby-g",
    status: "active",
  })
    .skip(skip)
    .limit(limit);

  const totalPages = Math.ceil(totalProducts / limit); // Tính tổng số trang

  res.render("client/pages/product/babyg", {
    categoryName: "BABY-G",
    pageTitle: "Trang chủ",
    products: babyg,
    currentPage: page,
    totalPages: totalPages,
  });
};

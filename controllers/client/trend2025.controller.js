const Products = require("../../models/product.model");

// [GET] /home
module.exports.trend2025 = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Trang hiện tại (mặc định là trang 1)
  const limit = 8; // Số sản phẩm mỗi trang
  const skip = (page - 1) * limit; // Bỏ qua số sản phẩm của các trang trước

  // Lấy tổng số sản phẩm
  const totalProducts = await Products.countDocuments({
    deleted: false,
    featured: 1,
    status: "active",
  });

  // Lấy danh sách sản phẩm cho trang hiện tại
  const apple = await Products.find({
    deleted: false,
    featured: 1,
    status: "active",
  })
    .skip(skip)
    .limit(limit);

  const totalPages = Math.ceil(totalProducts / limit); // Tính tổng số trang

  res.render("client/pages/product/trend2025", {
    categoryName: "XU HƯỚNG 2024",
    pageTitle: "Trang chủ",
    products: trend2025,
    currentPage: page,
    totalPages: totalPages,
  });
};

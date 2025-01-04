const User = require("../../models/user.model");
const Products = require("../../models/product.model");

// [GET] /home
module.exports.index = async (req, res) => {
    // Kiểm tra xem người dùng có đăng nhập không
    const user = req.session.userId ? await User.findById(req.session.userId) : null;
    // Get list products featured
    const productsFeatured = await Products.find({
        deleted: false,
        featured: 1,
        status: "active",
    });

    // Giới hạn số lượng sản phẩm hiển thị (chỉ 8 sản phẩm)
    const limitedProducts = productsFeatured.slice(0,4);
    // Get the latest products list
    const productsNew = await Products.find({
        deleted: false,
        status: "active",
    }).sort({ position: "desc"}).limit(6);

    res.render('client/pages/home/index', {
        categoryName: "SẢN PHẨM NÔI BẬT",
        pageTitle: "Trang chủ",
        user: user, // Truyền biến user vào view
        productsFeatured: limitedProducts, // Chỉ truyền 8 sản phẩm
        productsNew: productsNew // Truyền 6 sản phẩm mới nhất
    });
};
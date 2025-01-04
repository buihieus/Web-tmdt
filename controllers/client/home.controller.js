const User = require("../../models/user.model");
const Products = require("../../models/product.model");

module.exports.index = async (req, res) => {
    try {
        const user = req.session.userId 
            ? await User.findById(req.session.userId).select("fullName") // Chỉ lấy trường fullName
            : null;

        const productsFeatured = await Products.find({
            deleted: false,
            featured: 1,
            status: "active",
        });

        const limitedProducts = productsFeatured.slice(0, 4);

        const productsNew = await Products.find({
            deleted: false,
            status: "active",
        }).sort({ position: "desc" }).limit(6);

        res.render('client/pages/home/index', {
            categoryName: "SẢN PHẨM NỔI BẬT",
            pageTitle: "Trang chủ",
            user: user, 
            productsFeatured: limitedProducts,
            productsNew: productsNew,
        });
    } catch (error) {
        console.error("Error fetching home page:", error);
        res.status(500).send("Đã xảy ra lỗi khi tải trang chủ!");
    }
};

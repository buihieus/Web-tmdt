const Cart = require("../../models/cart.model");
const Order = require("../../models/order.model");
const Product = require("../../models/product.model"); // Giả sử bạn có mô hình sản phẩm

module.exports.index = async (req, res) => {
    try {
        const userId = req.user._id;

        if (!userId) {
            console.error("User is not authenticated");
            return res.status(401).send("Unauthorized");
        }

        const selectedItems = req.query.itemIds ? req.query.itemIds.split(',') : []; // Nhận itemIds từ query string

        // Kiểm tra nếu không có sản phẩm nào được chọn
        if (selectedItems.length === 0) {
            req.flash("error", "Bạn chưa chọn sản phẩm nào để thanh toán!");
            return res.redirect("/cart");
        }

        const cart = await Cart.findOne({ user_id: userId });

        if (!cart || cart.products.length === 0) {
            req.flash("error", "Giỏ hàng của bạn đang trống!");
            return res.redirect("/cart");
        }

        // Lọc các sản phẩm đã được chọn từ giỏ hàng
        const selectedProducts = cart.products.filter(item => 
            selectedItems.includes(item.product_id.toString()) // So sánh với product_id
        );

        // Log các sản phẩm đã chọn
        console.log("Selected Products:", selectedProducts);

        if (selectedProducts.length === 0) {
            req.flash("error", "Không tìm thấy sản phẩm đã chọn trong giỏ hàng!");
            return res.redirect("/cart");
        }

        // Lấy thông tin chi tiết sản phẩm từ cơ sở dữ liệu
        const detailedProducts = await Promise.all(selectedProducts.map(async (item) => {
            const product = await Product.findById(item.product_id); // Lấy thông tin sản phẩm
            return {
                product_id: item.product_id,
                title: product.title,
                thumbnail: product.thumbnail,
                price: product.price,
                quantity: item.quantity,
                totalPrice: product.price * item.quantity
            };
        }));

        // Tính tổng giá cho các sản phẩm đã chọn
        const totalPrice = detailedProducts.reduce((sum, item) => sum + (item.totalPrice || 0), 0);

        res.render("client/pages/order/index.pug", {
            pageTitle: "Phương thức thanh toán",
            cartDetail: { products: detailedProducts, totalPrice }
        });
    } catch (error) {
        console.error("Error in /payment:", error);
        res.status(500).send("Internal server error");
    }
};
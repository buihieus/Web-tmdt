const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const productsHelper = require("../../helpers/products");

// [GET] /cart
module.exports.index = async (req, res) => {
    try {
        const userId = req.user._id; // Lấy user_id từ thông tin người dùng đã đăng nhập

        if (!userId) {
            console.error("User is not authenticated");
            return res.status(401).send("Unauthorized");
        }

        const cart = await Cart.findOne({ user_id: userId });

        if (!cart) {
            console.error("Cart not found for userId:", userId);
            return res.render("client/pages/cart/index.pug", {
                pageTitle: "Giỏ hàng",
                cartDetail: { products: [], totalPrice: 0 },
            });
        }

        if (cart.products.length > 0) {
            for (const item of cart.products) {
                const productId = item.product_id;
                const productInfo = await Product.findOne({ _id: productId });

                if (!productInfo) {
                    console.error("Product not found for productId:", productId);
                    continue;
                }

                productInfo.priceNew = productsHelper.priceNewProduct(productInfo);
                item.productInfo = productInfo;
                item.totalPrice = item.quantity * productInfo.priceNew;
            }
        }

        cart.totalPrice = cart.products.reduce(
            (sum, item) => sum + (item.totalPrice || 0),
            0
        );

        res.render("client/pages/cart/index.pug", {
            pageTitle: "Giỏ hàng",
            cartDetail: cart,
        });
    } catch (error) {
        console.error("Error in /cart:", error);
        res.status(500).send("Internal server error");
    }
};

// [POST] /cart/add/:productId
module.exports.addPost = async (req, res) => {
    try {
        const userId = req.user._id; // Lấy user_id từ thông tin người dùng đã đăng nhập
        const productId = req.params.productId;
        const quantity = parseInt(req.body.quantity, 10) || 1;

        if (!userId) {
            console.error("User is not authenticated");
            return res.status(401).send("Unauthorized");
        }

        let cart = await Cart.findOne({ user_id: userId });

        if (!cart) {
            cart = await Cart.create({
                user_id: userId,
                products: [
                    {
                        product_id: productId,
                        quantity: quantity,
                    },
                ],
            });

            req.flash("success", "Tạo giỏ hàng và thêm sản phẩm thành công!");
            return res.redirect("back");
        }

        const existProductInCart = cart.products.find(
            (item) => item.product_id.toString() === productId
        );

        if (existProductInCart) {
            existProductInCart.quantity += quantity;
        } else {
            cart.products.push({ product_id: productId, quantity: quantity });
        }

        await cart.save(); // Lưu lại thay đổi

        req.flash("success", "Thêm sản phẩm thành công!");
        res.redirect("back");
    } catch (error) {
        console.error("Error in /cart/add:", error);
        res.status(500).send("Internal server error");
    }
};

// [GET] /cart/delete/:productId
module.exports.delete = async (req, res) => {
    try {
        const userId = req.user._id; // Lấy user_id từ thông tin người dùng đã đăng nhập
        const productId = req.params.productId;

        if (!userId) {
            console.error("User is not authenticated");
            return res.status(401).send("Unauthorized");
        }

        await Cart.updateOne(
            { user_id: userId },
            { $pull: { products: { product_id: productId } } }
        );

        req.flash("success", "Xóa sản phẩm thành công!");
        res.redirect("back");
    } catch (error) {
        console.error("Error in /cart/delete:", error);
        res.status(500).send("Internal server error");
    }
};

// [GET] /cart/update/:productId/:quantity
module.exports.update = async (req, res) => {
    try {
        const userId = req.user._id; // Lấy user_id từ thông tin người dùng đã đăng nhập
        const productId = req.params.productId;
        const quantity = parseInt(req.params.quantity, 10);

        if (!userId) {
            console.error("User is not authenticated");
            return res.status(401).send("Unauthorized");
        }

        if (isNaN(quantity) || quantity <= 0) {
            req.flash("error", "Số lượng không hợp lệ!");
            return res.redirect("back");
        }

        await Cart.updateOne(
            { user_id: userId, "products.product_id": productId },
            { "products.$.quantity": quantity }
        );

        req.flash("success", "Cập nhật số lượng thành công!");
        res.redirect("back");
    } catch (error) {
        console.error("Error in /cart/update:", error);
        res.status(500).send("Internal server error");
    }
};

// [POST] /cart/update-quantity/:productId
module.exports.updateQuantity = async (req, res) => {
    try {
        const userId = req.user._id; // Lấy user ID của người dùng hiện tại
        const productId = req.params.productId; // ID sản phẩm được gửi từ form
        const quantity = parseInt(req.body.quantity, 10); // Lấy số lượng từ form

        if (!userId) {
            console.error("User is not authenticated");
            return res.status(401).send("Unauthorized");
        }

        if (isNaN(quantity) || quantity <= 0) {
            req.flash("error", "Số lượng không hợp lệ!");
            return res.redirect("back");
        }

        const cart = await Cart.findOne({ user_id: userId });

        if (!cart) {
            req.flash("error", "Giỏ hàng không tồn tại!");
            return res.redirect("back");
        }

        const productInCart = cart.products.find(
            (item) => item.product_id == productId
        );

        if (productInCart) {
            productInCart.quantity = quantity;
            await cart.save(); // Lưu lại thay đổi
        } else {
            req.flash("error", "Sản phẩm không tồn tại trong giỏ hàng!");
        }

        req.flash("success", "Cập nhật số lượng thành công!");
        res.redirect("/cart"); // Quay lại trang giỏ hàng
    } catch (error) {
        console.error("Error in /cart/update-quantity:", error);
        res.status(500).send("Internal server error");
    }
};
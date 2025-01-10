const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const Order = require("../../models/order.model"); // Assuming you have an Order model

// [GET] /payment
module.exports.index = async (req, res) => {
    try {
        const userId = req.user._id;

        if (!userId) {
            console.error("User is not authenticated");
            return res.status(401).send("Unauthorized");
        }

        const cart = await Cart.findOne({ user_id: userId });

        if (!cart || cart.products.length === 0) {
            console.error("Cart is empty or not found for userId:", userId);
            req.flash("error", "Giỏ hàng của bạn đang trống!");
            return res.redirect("/cart");
        }

        // Calculate total price if necessary
        cart.totalPrice = cart.products.reduce(
            (sum, item) => sum + (item.totalPrice || 0),
            0
        );

        res.render("client/pages/order/index.pug", {
            pageTitle: "Phương thức thanh toán",
            cartDetail: cart,
        });
    } catch (error) {
        console.error("Error in /payment:", error);
        res.status(500).send("Internal server error");
    }
};

// [POST] /payment/checkout
module.exports.checkout = async (req, res) => {
    try {
        const userId = req.user._id; 
        const paymentMethod = req.body.paymentMethod; 

        if (!userId) {
            console.error("User is not authenticated");
            return res.status(401).send("Unauthorized");
        }

        const cart = await Cart.findOne({ user_id: userId });

        if (!cart || cart.products.length === 0) {
            req.flash("error", "Giỏ hàng của bạn đang trống!");
            return res.redirect("/cart");
        }

        const order = new Order({
            user_id: userId,
            products: cart.products,
            totalPrice: cart.totalPrice,
            paymentMethod: paymentMethod,
            status: 'Pending' // or any initial status
        });

        await order.save();

        await Cart.deleteOne({ user_id: userId });

        req.flash("success", "Thanh toán thành công!");
        res.redirect(`/order/${order._id}`); 
    } catch (error) {
        console.error("Error in /payment/checkout:", error);
        res.status(500).send("Internal server error");
    }
};
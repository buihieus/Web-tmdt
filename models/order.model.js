const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
            price: {
                type: Number,
                required: true,
            },
            totalPrice: {
                type: Number,
                required: true,
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ["Cash on Delivery", "Credit/Debit Card", "E-Wallet"],
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
        default: "Pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Middleware để cập nhật trường updatedAt trước khi lưu
OrderSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

// Middleware để tính toán tổng giá khi lưu
OrderSchema.pre("save", function (next) {
    if (this.isModified('products')) {
        this.totalPrice = this.products.reduce((sum, product) => sum + product.totalPrice, 0);
    }
    next();
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
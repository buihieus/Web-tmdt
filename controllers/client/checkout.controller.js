const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const Order = require("../../models/order.model");

const productsHelper = require("../../helpers/products");

// [GET] /checkout/
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

    res.render("client/pages/checkout/index.pug", {
      pageTitle: "Đặt hàng",
      cartDetail: cart,
    });
  } catch (error) {
    console.error("Error in /cart:", error);
    res.status(500).send("Internal server error");
  }
};

// [POST] /checkout/order
module.exports.order = async (req, res) => {
  const cartId = req.cookies.cartId;
  const userInfo = req.body;
  const cart = await Cart.findOne({
    _id: cartId,
  });
  
  let products = [];

  for (const product of cart.products) {
    const objectProduct = {
      product_id: product.product_id,
      price: 0,
      discountPercentage: 0,
      quantity: product.quantity,
    };

    const productInfo = await Product.findOne({
      _id: product.product_id,
    });

    objectProduct.price = productInfo.price;
    objectProduct.discountPercentage = productInfo.discountPercentage;

    products.push(objectProduct);
  }

  const objectOrder = {
    cart_id: cartId,
    userInfo: userInfo,
    products: products,
  };

  const order = new Order(objectOrder);
  await order.save();

  await Cart.updateOne({ _id: cartId }, {  processed: true  });
  res.redirect(`/checkout/success/${order.id}`);
};

// module.exports.order = async (req, res) => {
//   try {
//     const cartId = req.cookies.cartId;
//     const userInfo = req.body;

//     // Tìm giỏ hàng
//     const cart = await Cart.findOne({ _id: cartId });

//     if (!cart || !cart.products || cart.products.length === 0) {
//       console.error("Cart is empty or not found");
//       req.flash("error", "Giỏ hàng rỗng!");
//       return res.redirect("/cart");
//     }

//     // Chuẩn bị danh sách sản phẩm từ giỏ hàng
//     let products = [];
//     for (const product of cart.products) {
//       const productInfo = await Product.findOne({ _id: product.product_id });
//       if (!productInfo) {
//         console.error("Product not found:", product.product_id);
//         continue;
//       }

//       products.push({
//         product_id: product.product_id,
//         price: productInfo.price,
//         discountPercentage: productInfo.discountPercentage,
//         quantity: product.quantity,
//       });
//     }

//     // Tạo đơn hàng
//     const objectOrder = {
//       cart_id: cartId,
//       userInfo: userInfo,
//       products: products,
//     };

//     const order = new Order(objectOrder);
//     await order.save();

//     // Xóa giỏ hàng (có thể bỏ qua nếu không cần xóa ngay)
//     await Cart.updateOne({ _id: cartId }, { products: [] });

//     res.redirect(`/checkout/success/${order._id}`);
//   } catch (error) {
//     console.error("Error in /checkout/order:", error);
//     res.status(500).send("Internal server error");
//   }
// };

// [GET] /checkout/success/:orderId
module.exports.success = async (req, res) => {
  const order = await Order.findOne({
    _id: req.params.orderId,
  });

  for (const product of order.products) {
    const productInfo = await Product.findOne({
      _id: product.product_id,
    }).select("title thumbnail");

    product.productInfo = productInfo;

    product.priceNew = productsHelper.priceNewProduct(product);

    product.totalPrice = product.priceNew * product.quantity;
  }

  order.totalPrice = order.products.reduce((sum, item) => sum + item.totalPrice, 0);

  res.render("client/pages/checkout/success.pug", {
    pageTitle: "Đặt hàng thành công",
    order: order,
  });
};

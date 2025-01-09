const Cart = require("../../models/cart.model");

module.exports.cartId = async (req, res, next) => {
  try {
    if (req.path.startsWith('/admin')) {
      return next(); 
    }
    
    if (!req.cookies.cartId) {
      const cart = new Cart();
      const savedCart = await cart.save();

      if (!savedCart) {
        console.error("Failed to create cart in MongoDB");
        return res.status(500).send("Failed to initialize cart.");
      }

      const expiresCookie = 365 * 24 * 60 * 60 * 1000; // 1 year
      res.cookie("cartId", cart.id, { expires: new Date(Date.now() + expiresCookie) });
    } else {
      const cart = await Cart.findOne({ _id: req.cookies.cartId });

      if (!cart) {
        console.error("Cart not found for cartId:", req.cookies.cartId);
        return res.status(404).send("Cart not found.");
      }

      cart.totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0);
      res.locals.minicart = cart;
    }

    next();
  } catch (error) {
    console.error("Error in cart middleware:", error);
    res.status(500).send("Internal server error");
  }
};
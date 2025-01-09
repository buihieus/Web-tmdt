const Cart = require("../../models/cart.model");

module.exports.cartId = async (req, res, next) => {
  try {
    // Check if the request is for an admin route
    if (req.path.startsWith('/admin')) {
      return next(); // Skip cart handling for admin routes
    }
    
    if (!req.cookies.cartId) {
      // Assuming you have a user ID to assign to the cart
      const userId = req.user ? req.user.id : null; // Modify this according to your authentication logic
      
      const cart = new Cart({ user_id: userId }); // Include user_id
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
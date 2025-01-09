const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");
const cartmiddleware = require("../../middleware/client/cart.middleware");
// Import route "guidebuyonline"
const guidebuyonlineRoute = require('./guidebuyonline.route');

const paymentguideRoute = require('./paymentguide.route');
const shippingpolicyRoute = require('./shippingpolicy.route');
const transactionconditionsRoute = require('./transactionconditions.route');
const privacypolicyRoute = require('./privacypolicy.route');
const warrantypolicyRoute = require('./warrantypolicy.route');
const returnpolicyRoute = require('./returnpolicy.route');
const paymenttermsRoute = require('./paymentterms.route');
const omegaRoute = require("./omega.route");
const trend2025Route = require("./trend2025.route");
const appleRoute = require("./apple.route");
const versaceRoute = require("./versace.route");
const babygRoute = require("./babyg.route");
const searchRoute = require("./search.route");
const userRoute = require("./user.route");
const cartRoute = require("./cart.route");

const userMiddleware = require("../../middleware/client/user.middleware.js");

//sử dụng trong file index.js chính
module.exports = (app) => {
  app.use('/', homeRoutes);
  app.use(userMiddleware.infoUser);

  app.use('/products', productRoutes);
  app.use('/guidebuyonline',guidebuyonlineRoute);
  app.use('/paymentguide',paymentguideRoute);
  app.use('/shippingpolicy',shippingpolicyRoute);
  app.use('/transactionconditions', transactionconditionsRoute);
  app.use('/privacypolicy', privacypolicyRoute);
  app.use('/warrantypolicy', warrantypolicyRoute);
  app.use('/returnpolicy', returnpolicyRoute);
  app.use('/paymentterms', paymenttermsRoute);
  app.use("/user", userRoute);
  app.use('/omega', omegaRoute);
  app.use('/trend2025', trend2025Route);
  app.use('/apple', appleRoute);
  app.use('/versace', versaceRoute);
  app.use('/babyg', babygRoute);
  app.use('/search', searchRoute);
  
  app.use(cartmiddleware.cartId);
  app.use('/cart', cartRoute);
}
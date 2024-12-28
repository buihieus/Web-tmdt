const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");
// Import route "guidebuyonline"
const guidebuyonlineRoute = require('./guidebuyonline.route');

const paymentguideRoute = require('./paymentguide.route');
const shippingpolicyRoute = require('./shippingpolicy.route');
const transactionconditionsRoute = require('./transactionconditions.route');
const privacypolicyRoute = require('./privacypolicy.route');
const warrantypolicyRoute = require('./warrantypolicy.route');
const returnpolicyRoute = require('./returnpolicy.route');
const paymenttermsRoute = require('./paymentterms.route');
//sử dụng trong file index.js chính
module.exports = (app) => {
  app.use('/', homeRoutes);

  app.use('/products', productRoutes);
  app.use('/guidebuyonline',guidebuyonlineRoute);
  app.use('/paymentguide',paymentguideRoute);
  app.use('/shippingpolicy',shippingpolicyRoute);
  app.use('/transactionconditions', transactionconditionsRoute);
  app.use('/privacypolicy', privacypolicyRoute);
  app.use('/warrantypolicy', warrantypolicyRoute);
  app.use('/returnpolicy', returnpolicyRoute);
  app.use('/paymentterms', paymenttermsRoute);
}
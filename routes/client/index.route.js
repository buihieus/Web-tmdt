const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");
const cartmiddleware = require("../../middleware/client/cart.middleware");
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
const casioRoute = require("./casio.route");
const rolexRoute = require("./rolex.route");
const fossilRoute = require("./fossil.route");
const tissotRoute = require("./tissot.route");
const citizenRoute = require("./citizen.route");
const oldRoute = require("./old.route");
const wallRoute = require("./wall.route");
const luxuryRoute = require("./luxury.route");
const casiosheenRoute = require("./casiosheen.route");
const bulovaRoute = require("./bulova.route");
const gshockRoute = require("./gshock.route");
const seikoRoute = require("./seiko.route");
const certinaRoute = require("./certina.route");
const calvinkleinRoute = require("./calvinklein.route");
const hublotRoute = require("./hublot.route");
const checkoutRoutes = require("./checkout.route");

// Import the payment routes

const userMiddleware = require("../../middleware/client/user.middleware.js");

// Use in main index.js file
module.exports = (app) => {
  app.use('/', homeRoutes);
  app.use(userMiddleware.infoUser);

  app.use('/products', productRoutes);
  app.use('/guidebuyonline', guidebuyonlineRoute);
  app.use('/paymentguide', paymentguideRoute);
  app.use('/shippingpolicy', shippingpolicyRoute);
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
  app.use('/casio', casioRoute);
  app.use('/rolex', rolexRoute);
  app.use('/fossil', fossilRoute);
  app.use('/tissot', tissotRoute);
  app.use('/citizen', citizenRoute);
  app.use('/old', oldRoute);
  app.use('/wall', wallRoute);
  app.use('/luxury', luxuryRoute);
  app.use('/casio-sheen', casiosheenRoute);
  app.use('/bulova', bulovaRoute);
  app.use('/gshock', gshockRoute);
  app.use('/seiko', seikoRoute);
  app.use('/certina', certinaRoute);
  app.use('/calvinklein', calvinkleinRoute);
  app.use('/hublot', hublotRoute);
  app.use("/checkout", checkoutRoutes);

  
  app.use(cartmiddleware.cartId);
  app.use('/cart', cartRoute);


}
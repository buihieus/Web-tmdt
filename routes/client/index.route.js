const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");

//sử dụng trong file index.js chính
module.exports = (app) => {
  app.use('/', homeRoutes);

  app.use('/products', productRoutes);
}
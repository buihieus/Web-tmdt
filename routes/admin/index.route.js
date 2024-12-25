const dashBoardRoutes = require("./dashboard.route")
const productRoutes = require("./product.route")
const categoryRoutes = require("./category.route")
const roleRoutes = require("./role.route")
const accountRoutes = require("./account.route")
const authRoutes = require("./auth.route")
const systemConfig = require("../../config/system")
module.exports = (app) => {
  const patchAdmin = systemConfig.prefixAdmin;
  app.use(patchAdmin + '/dashboard', dashBoardRoutes);
  app.use(patchAdmin + '/products', productRoutes);
  app.use(patchAdmin + '/category', categoryRoutes);
  app.use(patchAdmin + '/roles', roleRoutes);
  app.use(patchAdmin + '/accounts', accountRoutes);
  app.use(patchAdmin + '/auth', authRoutes);
}
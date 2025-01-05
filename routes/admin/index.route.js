const dashBoardRoutes = require("./dashboard.route")
const productRoutes = require("./product.route")
const categoryRoutes = require("./category.route")
const roleRoutes = require("./role.route")
const accountRoutes = require("./account.route")
const authRoutes = require("./auth.route")
const systemConfig = require("../../config/system")
const authMiddleware = require("../../middleware/admin/auth.middleware")
const myaccountRouter = require("./my-account.router")

module.exports = (app) => {
  const patchAdmin = systemConfig.prefixAdmin;
  app.use(patchAdmin + '/dashboard',authMiddleware.requireAuth, dashBoardRoutes);
  app.use(patchAdmin + '/products',authMiddleware.requireAuth, productRoutes);
  app.use(patchAdmin + '/category',authMiddleware.requireAuth, categoryRoutes);
  app.use(patchAdmin + '/roles',authMiddleware.requireAuth, roleRoutes);
  app.use(patchAdmin + '/accounts',authMiddleware.requireAuth, accountRoutes);
  app.use(patchAdmin + '/auth', authRoutes);
  app.use(patchAdmin + '/my-account',authMiddleware.requireAuth, myaccountRouter);
}
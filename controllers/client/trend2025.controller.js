const Products = require("../../models/product.model");

// [GET] /home
module.exports.trend2025 = async (req, res) => {

    // Get list products featured
  const trend2025 = await Products.find({
    deleted: false,
    featured: 1,
    status: "active",
  });


    res.render('client/pages/product/trend2025', {
        pageTitle: "Trang chủ",
        products: trend2025
    });
};


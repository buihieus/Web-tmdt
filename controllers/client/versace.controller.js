const Products = require("../../models/product.model");

// [GET] /home
module.exports.versace = async (req, res) => {

    // Get list products featured
  const versace = await Products.find({
    deleted: false,
    brand : "versace",
    status: "active",
  });


    res.render('client/pages/product/versace', {
        pageTitle: "Trang chủ",
        products: versace
    });
};


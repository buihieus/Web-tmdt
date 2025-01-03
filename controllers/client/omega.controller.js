const Products = require("../../models/product.model");

// [GET] /home
module.exports.omega = async (req, res) => {

    // Get list products featured
  const omega = await Products.find({
    deleted: false,
    brand : "omega",
    status: "active",
  });


    res.render('client/pages/product/omega', {
        pageTitle: "Trang chủ",
        products: omega 
    });
};


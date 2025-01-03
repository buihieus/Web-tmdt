const Products = require("../../models/product.model");

// [GET] /home
module.exports.apple = async (req, res) => {

    // Get list products featured
  const apple = await Products.find({
    deleted: false,
    brand : "apple",
    status: "active",
  });


    res.render('client/pages/product/apple', {
        pageTitle: "Trang chủ",
        products: apple
    });
};


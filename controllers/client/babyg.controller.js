const Products = require("../../models/product.model");

// [GET] /home
module.exports.babyg = async (req, res) => {

    // Get list products featured
  const babyg = await Products.find({
    deleted: false,
    brand : "baby-g",
    status: "active",
  });


    res.render('client/pages/product/babyg', {
        pageTitle: "Trang chủ",
        products: babyg
    });
};


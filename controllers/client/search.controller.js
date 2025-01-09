const Product = require("../../models/product.model");
const productsHelper = require("../../helpers/products");

// [GET] /search/
module.exports.search = async (req, res) => {
  const keyword = req.query.keyword;
  let newProducts = [];

  if (keyword) {
    const keywordRegex = new RegExp(keyword, "i");
    const products = await Product.find({
      title: keywordRegex,
      status: "active",
      deleted: false,
    });
    productsHelper.priceNewProducts(products);
    newProducts = products;
  }
  res.render("client/pages/search/index.pug", {
    pageTitle: "Kết quả tìm kiếm",
    keyword: keyword,
    products: newProducts,
  });
};

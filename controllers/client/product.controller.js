const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const productsHelper = require("../../helpers/products");
const productsCategoryHelper = require("../../helpers/products-category");

// [GET] /products
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false,
  }).sort({ position: "desc" });

  productsHelper.priceNewProducts(products);

  res.render("client/pages/products/index.pug", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
  });
};

// [GET] /products/detail/:slugProduct
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      slug: req.params.slugProduct,
      status: "active",
    };

    const product = await Product.findOne(find);

    if(product.product_category_id) {
      const category = await ProductCategory.findOne({
        _id: product.product_category_id,
        status: "active",
        deleted: false
      })
      product.category = category
    }

    product.priceNew = productsHelper.priceNewProduct(product)

    res.render("client/pages/products/detail.pug", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    res.redirect('/products');
  }
};

// [GET] /products/:slugCategory
module.exports.category = async (req, res) => {
  const category = await ProductCategory.findOne({
    slug: req.params.slugCategory,
    status: "active",
    deleted: false,
  });

  const listSubCategory = await productsCategoryHelper.getSubCategory(
    category.id
  );

  const listSubCategoryId = listSubCategory.map((item) => item.id);
  const products = await Product.find({
    product_category_id: { $in: [category.id, ...listSubCategoryId] },
    deleted: false,
    status: "active",
  }).sort({ position: "desc" });

  productsHelper.priceNewProducts(products);

  res.render("client/pages/products/index.pug", {
    pageTitle: category.title,
    products: products,
  });
};

// Lấy thông tin chi tiết sản phẩm
module.exports.getProductDetail = async (req, res) => {
  try {
    const productId = req.params.id; // Lấy ID sản phẩm từ URL
    const product = await Product.findById(productId); // Lấy sản phẩm từ DB


    if (!product) {
      req.flash("error", "Không tìm thấy sản phẩm!");
      return res.redirect("/"); // Quay về trang chủ nếu không tìm thấy
    }


    res.render("client/pages/product/detail", {
      product, // Truyền dữ liệu sản phẩm vào template
    });
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).send("Internal server error");
  }
};


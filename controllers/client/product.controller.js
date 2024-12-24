const Product = require("../../models/product.model")

// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({ position : "desc"});
    res.render('client/pages/product/index', {
        pageTitle: "Trang sản phẩm",
        products: products
    });
}

// [GET] /products/:slug
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            slug: req.params.slug,
            status: "active"
        };
        const product = await Product.findOne(find);

        res.render('client/pages/product/detail', {
            pageTitle: product.title,
            product: product
        });
        
    } catch (error) {
        res.redirect(`/products`);
    }
    
}
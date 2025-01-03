module.exports.priceNewProducts = (products) => {
  products.map((item) => {
    item.priceNew = (
      (item.price * (100 - item.discountPercentage)) / 100 ).toFixed(0);
      return item;
  });
};

module.exports.priceNewProduct = (product) => {
  const priceNew = (
    (product.price * (100 - product.discountPercentage)) / 100 ).toFixed (0);

  return priceNew;
};

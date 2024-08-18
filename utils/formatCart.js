/**
 * @typedef {{
        id: string;
        title: string;
        price: number | string;
        image: string;
        discountPercentage: number | null;
        stock: number;
        sold: number;
    }} Product
 * @param {Product} cartProducts
 * @returns
 */

module.exports = function formatCart(cartProducts) {
  return cartProducts.reduce((products, product) => {
    /**
     * @type {Product}
     */
    let cartProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      stock: product.stock,
      image: JSON.parse(product.images)[0],
      discountPercentage: product.discountPercentage,
      sold: product.sold,
    };
    products.push(cartProduct);
    return products;
  }, []);
};

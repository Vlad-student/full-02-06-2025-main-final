const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");

module.exports.getStats = async (req, res, next) => {
  try {
    const [usersCount, ordersCount, productsCount] = await Promise.all([
      User.countDocuments(),
      Order.countDocuments(),
      Product.countDocuments(),
    ]);

    res.status(200).send({
      data: {
        users: usersCount,
        orders: ordersCount,
        products: productsCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

// module.exports.getStats = async (req, res, next) => {
//   try {
//     const users = await User.find();
//     const orders = await Order.find();
//     const products = await Product.find();
//     res.status(200).send({ data: {users, orders, products} });
//   } catch (error) {
//     next(error);
//   }
// };

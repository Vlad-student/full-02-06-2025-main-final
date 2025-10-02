const Product = require("../models/Product");
const Category = require("../models/Category");

module.exports.filterProducts = async (req, res, next) => {
  try {
    const { minPrice, maxPrice, availability, category, sale } = req.query;
    req.filter = {};
    if (minPrice || maxPrice) {
      req.filter.price = {};
      if (minPrice) {
        req.filter.price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        req.filter.price.$lt = Number(maxPrice);
      }
    }
    if (availability) {
      req.filter.stockQty = {};
      if (availability === "true") {
        req.filter.stockQty.$gte = 1;
      } else {
        req.filter.stockQty.$eq = 0;
      }
    }
    if (category) {
      req.filter.category = category;
    }
    if (sale) {
      req.filter.isSale = sale === "true";
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports.filterOrders = async (req, res, next) => {
  try {
    const { user, status, method } = req.query;
    req.filter = {};
    if (user) {
      req.filter.user = user;
    }
    if (status) {
      req.filter.status = status;
    }
    if (method) {
      req.filter.shippingMethod = method.replace("_", " ");
    }
    next();
  } catch (error) {
    next(error);
  }
};


// module.exports.getFilterProducts = async (req, res, next) => {
//   try {
//     const {
//       page = 1,
//       limit = 12,
//       minPrice,
//       maxPrice,
//       category,
//       stockQty,
//       isSale,
//     } = req.query;

//     const filter = {};

//     if (minPrice || maxPrice) {
//       filter.price = {};
//       if (minPrice) filter.price.$gte = Number(minPrice);
//       if (maxPrice) filter.price.$lte = Number(maxPrice);
//     }

//     if (category) {
//       filter.category = category;
//     }

//     if (stockQty === true) {
//       filter.stockQty = { $gt: 0 };
//     }

//     if (isSale === true) {
//       filter.isSale = true;
//     }

//     const [products] = await Promise.all([
//       Product.find(filter),
//       Product.countDocuments(filter),
//     ]);

//     res.status(200).send({
//       data: products,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports.getCategories = async (req, res, next) => {
//   try {
//     const categories = await Category.find();
//     res.status(200).send({
//       data: categories,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

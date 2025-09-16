module.exports.filterProducts = async (req, res, next) => {
  try {
    const { price_from, price_to, in_stock, category, on_sale } = req.query;
    req.filter = {};

    if (price_from &&  !isNaN(Number(price_from)) || price_to && !isNaN(Number(price_to))) {
      req.filter.price = {};
      if (price_from &&  !isNaN(Number(price_from))) {
        req.filter.price.$gte = Number(price_from);
      }
      if (price_to && !isNaN(Number(price_to))) {
        req.filter.price.$lte = Number(price_to);
      }
    }

    if (in_stock) {
      req.filter.stockQty = {};
      if (in_stock === "true") {
        req.filter.stockQty.$gte = 1;
      } else {
        req.filter.stockQty.$eq = 0;
      }
    }

    if (category) {
      req.filter.category = category;
    }

    if (on_sale === true) {
      req.filter.isSale = on_sale === "true";
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

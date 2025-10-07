const fs = require("fs/promises");
const path = require("path");
const createError = require("http-errors");
const Product = require("../models/Product");
const CONSTANTS = require("../constants");

module.exports.createProduct = async (req, res, next) => {
  try {
    const images = req.files?.map((item) => item.filename) || [];
    const product = await Product.create({ ...req.body, images });
    await product.populate({
      path: "category",
      select: "name",
    });
    res.status(201).send({ data: product });
  } catch (error) {
    if (error.code === 11000) {
      return next(
        createError(409, "Product in selected category already exists")
      );
    }
    next(error);
  }
};

module.exports.getAllProducts = async (req, res, next) => {
  try {
    const { limit, skip } = req.pagination;
    const products = await Product.find(req.filter)
      .populate({
        path: "category",
        select: "name",
      })
      .skip(skip)
      .limit(limit);
    res.status(200).send({ data: products });
  } catch (error) {
    next(error);
  }
};

module.exports.getProductById = async (req, res, next) => {
  try {
    const { idProduct } = req.params;
    const product = await Product.findById(idProduct).populate({
      path: "category",
      select: "name",
    });
    if (!product) {
      throw createError(404, "Product not found");
    }
    res.status(200).send({ data: product });
  } catch (error) {
    next(error);
  }
};

module.exports.updateProduct = async (req, res, next) => {
  try {
    const { idProduct } = req.params;
    const product = await Product.findById(idProduct);
    if (!product) {
      throw createError(404, "Product not found");
    }

    if (req.files && product.images.length) {
      await Promise.all(
        product.images.map((img) =>
          fs.unlink(path.join(__dirname, "..", CONSTANTS.UPLOAD_FOLDER, img))
        )
      );
    }

    const updatedImages =
      req.files?.map((item) => item.filename) || product.images;

    Object.assign(product, req.body, { images: updatedImages });
    await product.save();

    await product.populate({
      path: "category",
      select: "name",
    });

    res.status(200).send({ data: product });
  } catch (error) {
    if (error.code === 11000) {
      return next(
        createError(409, "Product in selected category already exists")
      );
    }
    next(error);
  }
};

module.exports.deleteProduct = async (req, res, next) => {
  try {
    const { idProduct } = req.params;
    const product = await Product.findByIdAndDelete(idProduct);
    if (!product) {
      throw createError(404, "Product not found");
    }
    if (product.images.length) {
      await Promise.all(
        product.images.map((img) =>
          fs.unlink(path.join(__dirname, "..", CONSTANTS.UPLOAD_FOLDER, img))
        )
      );
    }
    res.status(200).send({ data: product });
  } catch (error) {
    next(error);
  }
};

module.exports.getProductsOnSale = async (req, res, next) => {
  try {
    const products = await Product.find({ isSale: true });
    if (!products) {
      throw createError(404, "Product not found");
    }
    res.status(200).send({ data: products });
  } catch (error) {
    next(error);
  }
};

// module.exports.getFilteredProducts = async (req, res, next) => {
//   try {
//     const { limit, skip } = req.pagination;
//     const filter = req.filter || {};
//     const [products] = await Promise.all([
//       Product.find(filter)
//         .populate({
//           path: "category",
//           select: "name",
//         })
//         .skip(skip)
//         .limit(limit),
//     ]);
//     res.status(200).send({ data: products });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports.getCategoriesForFilter = async (req, res, next) => {
//   try {
//     const categories = await Product.aggregate([
//       {
//         $lookup: {
//           from: "categories",
//           localField: "category",
//           foreignField: "_id",
//           as: "categoryInfo",
//         },
//       },
//       {
//         $group: {
//           _id: "$category",
//           name: { $first: "$categoryInfo.name" },
//           count: { $sum: 1 },
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           name: { $arrayElemAt: ["$name", 0] },
//           count: 1,
//         },
//       },
//     ]);
//     res.status(200).send({
//       data: categories.filter((cat) => cat.name),
//     });
//   } catch (error) {
//     next(error);
//   }
// };

module.exports.searchProducts = async (req, res, next) => {
  try {
    const { title } = req.query;
    const { limit, skip } = req.pagination;
    const [products, totalProducts] = await Promise.all([
      Product.find({
        title: { $regex: title, $options: "i" },
      })
        .populate({ path: "category", select: "name" })
        .skip(skip)
        .limit(limit),
      Product.countDocuments({
        title: { $regex: title, $options: "i" },
      }),
    ]);
    res.status(200).send({
      data: products,
      totalProducts,
    });
  } catch (error) {
    next(error);
  }
};

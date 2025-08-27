const fs = require('fs/promises');
const path = require('path');
const createError = require('http-errors');
const Product = require('../models/Product');
const CONSTANTS = require('../constants');

module.exports.createProduct = async (req, res, next) => {
  try {
    const images = req.files?.map((item) => item.filename) || [];
    const product = await Product.create({ ...req.body, images });
    await product.populate({
      path: 'category',
      select: 'name',
    });
    res.status(201).send({ data: product });
  } catch (error) {
    if (error.code === 11000) {
      return next(
        createError(409, 'Product in selected category already exists')
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
        path: 'category',
        select: 'name',
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
      path: 'category',
      select: 'name',
    });
    if (!product) {
      throw createError(404, 'Product not found');
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
      throw createError(404, 'Product not found');
    }

    if (req.files && product.images.length) {
      await Promise.all(
        product.images.map((img) =>
          fs.unlink(path.join(__dirname, '..', CONSTANTS.UPLOAD_FOLDER, img))
        )
      );
    }

    const updatedImages =
      req.files?.map((item) => item.filename) || product.images;

    Object.assign(product, req.body, { images: updatedImages });
    await product.save();

    await product.populate({
      path: 'category',
      select: 'name',
    });

    res.status(200).send({ data: product });
  } catch (error) {
    if (error.code === 11000) {
      return next(
        createError(409, 'Product in selected category already exists')
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
      throw createError(404, 'Product not found');
    }
    if (product.images.length) {
      await Promise.all(
        product.images.map((img) =>
          fs.unlink(path.join(__dirname, '..', CONSTANTS.UPLOAD_FOLDER, img))
        )
      );
    }
    res.status(200).send({ data: product });
  } catch (error) {
    next(error);
  }
};

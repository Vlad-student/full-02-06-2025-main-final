const express = require('express');
const { auth, isAdmin } = require('../middlewares/auth.mw');
const { validate } = require('../middlewares/validate.mw');
const upload = require('../middlewares/upload.mw');
const {
  createProductSchema,
  updateProductSchema,
} = require('../validators/product.validator');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/product.controller');
const CONSTANTS = require('../constants');
const { paginate } = require('../middlewares/pagination.mw');
const { filterProducts } = require('../middlewares/filter.mw');

const router = express.Router();

router.post(
  '/',
  auth,
  isAdmin,
  upload.array('images', CONSTANTS.MAX_LIMIT_IMG),
  validate(createProductSchema),
  createProduct
);

router.get('/', paginate, filterProducts , getAllProducts);
router.get('/:idProduct', getProductById);

router.patch(
  '/:idProduct',
  auth,
  isAdmin,
  upload.array('images', CONSTANTS.MAX_LIMIT_IMG),
  validate(updateProductSchema),
  updateProduct
);

router.delete('/:idProduct', auth, isAdmin, deleteProduct);

module.exports = router;

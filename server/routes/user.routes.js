const express = require('express');
const {
  registerSchema,
  loginSchema,
  updateSchema,
} = require('../validators/user.validator');
const {
  registerUser,
  loginUser,
  getAccount,
  getAllUsers,
  updateUser,
} = require('../controllers/user.controller');
const { validate } = require('../middlewares/validate.mw');
const { auth, isAdmin, isOwner } = require('../middlewares/auth.mw');

const router = express.Router();

router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);

router.get('/account', auth, getAccount);
router.get('/', auth, isAdmin, getAllUsers);
router.patch('/:idUser', auth, isOwner, validate(updateSchema), updateUser);

module.exports = router;

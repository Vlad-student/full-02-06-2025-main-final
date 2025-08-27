const CONSTANTS = {
  DB_HOST: '127.0.0.1',
  DB_PORT: '27017',
  DB_NAME: 'shop',
  USER_ROLES: ['customer', 'admin'],
  JWT_SECRET:
    'b9f3e8b4a1f14927a8e85d34c94c7aef6e6bbec9871e0b7abf9d8c84bfcde219',
  JWT_EXPIRES: '7d',
  MAX_LIMIT_IMG: 3,
  UPLOAD_FOLDER: 'uploads/',
  UPLOAD_IMG_TYPES: ['.jpg', '.jpeg', '.png', '.webp'],
  AMOUNT: 50,
  SHIPPING_METHOD: ['free', 'nova post', 'ukr post'],
  ORDER_STATUS: ['new', 'paid', 'confirm', 'shipped', 'delivered', 'canceled'],
  // Stripe TEST keys — for demo purposes only
  STRIPE_SECRET_KEY:
    'sk_test_51RrKlARL1VqIp3S35bvczI25FNtZTfUayn7QdIMHM26Z2oN1BMvG3LforCPgDQau3kQ3Nv8VYRvNUwWyxfHlF0Xc00LQkF27to',
  CLIENT_URL: 'http://localhost:5173',
};

module.exports = CONSTANTS;

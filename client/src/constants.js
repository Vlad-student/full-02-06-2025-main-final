const CONSTANTS = {
  BASE_URL: 'http://localhost:3000',
  UPLOAD_FOLDER: 'uploads',
  SHIPPING_METHOD: ['free', 'nova post', 'ukr post'],
  SHIPPING_PRICE: { free: 0, 'nova post': 80, 'ukr post': 50 },
  ORDER_STATUS: ['new', 'paid', 'confirm', 'shipped', 'delivered', 'canceled'],
  ORDER_AMOUNT: [2,5,10,15],
  // Stripe TEST keys — for demo purposes only
  STRIPE_SECRET_KEY:
    'pk_test_51RrKlARL1VqIp3S3HkswWhggVpWVkbiUdkBxbQURxCt8Iwx8r8JO7mBEeMHviV0kejBXm6dN4FfHSHmQS3hYPIm700i8EpCPGW',

};

export default CONSTANTS;

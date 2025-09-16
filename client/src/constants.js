const CONSTANTS = {
  BASE_URL: 'http://localhost:3000',
  UPLOAD_FOLDER: 'uploads',
  SHIPPING_METHOD: ['free', 'nova post', 'ukr post'],
  SHIPPING_PRICE: { free: 0, 'nova post': 80, 'ukr post': 50 },
  ORDER_STATUS: ['new', 'paid', 'confirm', 'shipped', 'delivered', 'canceled'],
  ORDER_AMOUNT: [2,5,10,15],
  // Stripe TEST keys — for demo purposes only
  STRIPE_SECRET_KEY:
    'pk_test_51RsNQxEwAJ4b9QpfkpEI0vYjGupfeN2xPtyr56zMxu5I4yQgv36ppp6yDynPXZz3GQjpv1Wsh64rPSHJQN3uCIdT001nIwOTrb',

};

export default CONSTANTS;

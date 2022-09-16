const {Schema, model} = require('mongoose');
const Product = require('./Product');

const cartSchema = new Schema(
    {
        userId: { type: String, required: true },
        products: [
          {
            productId: {
              type: String,
            },
            quantity: {
              type: Number,
              default: 1,
            },
          },
        ],
      },
      { timestamps: true }
)

const Cart = model('Cart', cartSchema)

module.exports = Cart;
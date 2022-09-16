const {Schema, model} = require('mongoose');

const orderSchema = new Schema(
    {
        userId: {
            type: String, 
            required: true
        }, 
        // products: {
        //     type: [Product]
        // }
        products: [{
            productId: {
                type: String, 
            }, 
            quantity: {
                type: Number, 
                default:1
            }
    }], 
        amount: {
            type: Number, 
            required: true
        }, 
        address: {
            type: Object, 
            required: true
        }, 
        status: {
            type: String, 
            default: "pending"
        }
    }, 
    {timestamps: true}
);

const Order = model("Order", orderSchema);

module.exports = Order;
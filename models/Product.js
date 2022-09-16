const {Schema, model} = require('mongoose');

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        }, 
        desc: {
            type: String,
            required: true, 
        }, 
        img: {
            type: String,
            required: true
        }, 
        categories: {
            type: Array, 
        }, 
        size: {
            type: String, 
        }, 
        color: {
            type: String, 
            default: false,
        }, 
        price: {
            type: Number, 
            default: false,
        }, 
    }, 
    {
        timestamps: true
    }
)

const Product = model('Product', productSchema);

module.exports = Product;
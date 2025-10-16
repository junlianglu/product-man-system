import mongoose from "mongoose";

const TAX_RATE_BUCKETS = [0, 0.05, 0.1];

const CartSchema = new mongoose.Schema({
    items: {
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                validate: {
                    validator: Number.isInteger,
                    message: "quantity must be an integer"
                }
            }
        }],
        default: []
    },
    taxRate: {
        type: Number,
        enum: TAX_RATE_BUCKETS,
        default: () => TAX_RATE_BUCKETS[Math.floor(Math.random() * TAX_RATE_BUCKETS.length)]
    },
    discountCode: {
        type: String,
        default: null,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export const Cart = mongoose.model('Cart', CartSchema);
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            enum: ["electronics", "clothing", "books", "beauty", "home", "sports"],
            default: "electronics",
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,          
        },
        stock: {
            type: Number,
            required: true,
            min: 0,     
            validate: Number.isInteger,   
        },   
        imageURL: {
            type: String,
            required: true,
        },  
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }, 
    },
    {timestamps: true}
);

export const Product = mongoose.model('Product', productSchema);
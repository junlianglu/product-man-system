import { Product } from "../models/Product.js";
import { User } from "../models/User.js";

export const createProduct = async ({userId, productData}) => {
    const user = await User.findById(userId);
    if(!user || !user.isAdmin)
        throw new Error("user does not exist or is not an admin");
    return await new Product({...productData, admin: userId}).save();
};

export const getProductById = async ({productId}) => {
    const product = await Product.findById(productId);
    if(!product)
        throw new Error("Product not found");
    return product;
};

export const getAllProducts = async ({page=1, limit = 10,sort = "default", search = ""}) => {
    const skip = (page - 1)*limit;
    const query = search ? {$or: [
            { name: { $regex: search, $options: "i" } },
            // { category: { $regex: search, $options: "i" } },
            // { description: { $regex: search, $options: "i" } }
            ]
        } : {};

    let sortOption = {};
    if (sort === "lastAdded") sortOption = { createdAt: -1 };
    else if (sort === "priceLowToHigh") sortOption = { price: 1 };
    else if (sort === "priceHighToLow") sortOption = { price: -1 };        

    const [products, totalCount] = await Promise.all([
        Product.find(query).sort(sortOption).skip(skip).limit(limit),
        Product.countDocuments(query),
    ]);

    const totalPages = Math.max(Math.ceil(totalCount / limit),1);
    return { products, totalPages, currentPage: page};
};

export const updateProductById = async ({userId, productId, productData}) => {
    const product = await Product.findById(productId);
    if(!product)
        throw new Error("Product not found");
    if(product.admin.toString() !== userId)
        throw new Error("user is not admin");
    Object.assign(product,productData);
    return await product.save();
};

export const deleteProductById = async ({userId, productId}) => {
    const product = await Product.findById(productId);
    if(!product)
        throw new Error("Product not found");
    if(product.admin.toString() !== userId)
        throw new Error("user is not admin");
    return await Product.findByIdAndDelete(productId);
};


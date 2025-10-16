import {createProduct as createProductService, 
        getProductById as getProductByIdService, 
        getAllProducts as getAllProductsService, 
        updateProductById as updateProductByIdService, 
        deleteProductById as deleteProductByIdService,} 
        from "../services/productService.js";

export const createProduct = async (req,res) => {
    try{
        const {...productData } = req.body;
        const product = await createProductService({userId:req.user.id, productData});
        res.status(201).json(product);
    } catch (err){
        res.status(400).json({error: err.message});
    }
};

export const getProductById = async (req,res) => {
    try{
        const {productId} = req.params;
        const product = await getProductByIdService({productId});
        res.status(200).json(product);
    } catch (err){
        res.status(404).json({error: err.message});
    }
};

export const getAllProducts = async (req,res) => {
    try{
        const products = await getAllProductsService();
        res.status(200).json(products);
    } catch (err){
        res.status(500).json({error: err.message});
    }
};

export const updateProductById = async (req,res) => {
    try{
        const {productId} = req.params;
        const {...productData } = req.body;
        const product = await updateProductByIdService({userId:req.user.id, productId, productData});      
        res.status(200).json(product);
    } catch (err){
        res.status(400).json({error: err.message});
    }
};

export const deleteProductById = async (req,res) => {
    try{
        const {productId} = req.params;
        const product = await deleteProductByIdService({productId, userId:req.user.id});
        res.status(200).json({
            message: "delete successfully",
            product,
        });
    } catch (err){
        res.status(400).json({error: err.message});
    }
};
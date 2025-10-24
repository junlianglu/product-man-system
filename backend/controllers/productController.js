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
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort || "default";
        const search = req.query.search || "";

        const {products, totalPages, currentPage} = await getAllProductsService({page, limit, sort, search});
        res.status(200).json({products, totalPages, currentPage});
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
        const product = await deleteProductByIdService({userId:req.user.id, productId});
        res.status(200).json({
            message: "delete successfully",
            product,
        });
    } catch (err){
        res.status(400).json({error: err.message});
    }
};
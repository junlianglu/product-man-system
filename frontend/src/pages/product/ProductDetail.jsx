import React, {useEffect} from "react";
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {selectSelectedProduct} from "../../features/product/productSelectors";
import {fetchProductById} from "../../features/product/productThunks";

export default function ProductDetail(){
    const {productId} = useParams();
    const dispatch = useDispatch();
    const product = useSelector(selectSelectedProduct);

    useEffect(() => {
        dispatch(fetchProductById(productId));
    }, [dispatch, productId]);

    if(!product) return <p>Loading...</p>;

    return(
        <div style={{}}>
            <img
                src={product.imageURL}
                alt={product.name}
                style={{}}
            />
            <h2>{product.name}</h2>
            <p>Description: {product.description}</p>
            <p>Category: {product.category}</p>
            <p>Stock: {product.stock}</p>
            <p>Price: ${product.price}</p>
        </div>
    );
}
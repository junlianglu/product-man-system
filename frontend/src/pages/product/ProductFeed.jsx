import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../../features/product/productThunks";
import {selectAllProducts,selectProductStatus} from "../../features/product/productSelectors";
import ProductCard from "../../components/product/ProductCard";
import {useNavigate} from "react-router-dom";

export default function ProductFeed() {
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const status = useSelector(selectProductStatus);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if(status === "loading") return <p>Loading products...</p>;
    if(status === "failed") return <p>Error loading products.</p>;
    return (
        <div style={{}}>
            {products.map((p) => (
                <ProductCard 
                key={p._id} 
                product={p}
                onClick={() => navigate(`/products/${p.id}`)} /> // pass onclick fucntion
            ))}
        </div>
    );
}
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../../features/product/productThunks";
import {selectAllProducts,selectProductStatus} from "../../features/product/productSelectors";
import ProductCard from "../../components/product/ProductCard";
import {selectAuthIsAdmin,selectAuthIsAuthenticated} from "../../features/auth/authSelectors";
import {addToCartThunk,updateItemQuantityThunk} from "../../features/cart/cartThunks";
import {useNavigate} from "react-router-dom";
import styles from "./ProductFeed.module.css";

export default function ProductFeed() {
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const status = useSelector(selectProductStatus);
    const isAdmin = useSelector(selectAuthIsAdmin);
    const isAuthenticated = useSelector(selectAuthIsAuthenticated);
    const navigate = useNavigate();

    const [sortOption, setSortOption] = useState("priceLowToHigh");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        dispatch(fetchProducts({page: currentPage, limit: 10})).unwrap()
        .then((data) => {
            if(data && data.totalPages)
                    setTotalPages(data.totalPages);
        }).catch(() => {});
    }, [dispatch, currentPage]);

    const sortedProducts = [...products].sort((a,b) => {
        if(sortOption === "lastAdded") return new Date(b.createdAt) - new Date(a.createdAt);
        if(sortOption === "priceLowToHigh") return a.price - b.price;
        if(sortOption === "priceHighToLow") return b.price - a.price;
        return 0;
    });

    const handleAddToCart = (productId) => {
        if(!isAuthenticated){
            alert("Please log in to add items to cart");
            return;
        }
        dispatch(addToCartThunk({productId, quantity:1}));
    };

    const handleUpdateQuantity = (productId, quantity) => {
        dispatch(updateItemQuantityThunk({productId, quantity}));
    }

    if(status === "loading") return <p>Loading products...</p>;
    if(status === "failed") return <p>Error loading products.</p>;
    return (
        <div className={styles.feedContainer}>
            <div className={styles.feedHeader}>
                <h2>Products</h2>
                <div className={styles.sortControls}>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className={styles.sortSelect}
                    >
                        <option value="lastAdded">Last Added</option>
                        <option value="priceLowToHigh">Price: low to high</option>
                        <option value="priceHighToLow">Price: high to low</option>
                    </select>
                    {isAdmin && 
                    <button 
                        className={styles.addButton}
                        onClick={() => navigate("/add-product")}
                    >Add product
                    </button>}
                </div>
            </div>

            <div className={styles.productGrid}>
                {sortedProducts.map((p) => (
                    <ProductCard 
                     key={p._id}
                     product={p}
                     isAdmin={isAdmin}
                     isAuthenticated ={isAuthenticated}
                     onAddToCart={() => handleAddToCart(p._id)}
                     onUpdateQuantity={handleUpdateQuantity}
                     />
                ))}
            </div>

            <div className={styles.pagination}>
                <button className={styles.pageButton} 
                    disabled={currentPage ===1} 
                    onClick={() => setCurrentPage((p) => Math.max(p-1,1))}>
                    «
                </button>
                {
                    [...Array(totalPages)].map((_,i) => 
                    <button
                        key={i+1}
                        className={`${styles.pageButton} ${
                        i + 1 === currentPage ? styles.activePage : ""
                        }`}
                        onClick={() => setCurrentPage(i+1)}
                    >
                        {i+1}
                    </button>)
                }
                <button className={styles.pageButton}
                    disabled={currentPage ===totalPages} 
                    onClick={() => setCurrentPage((p) => Math.min(p+1,totalPages))}>
                    »
                </button>
            </div>
        </div>
    );
}
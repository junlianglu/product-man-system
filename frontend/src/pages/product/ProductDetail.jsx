import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {selectSelectedProduct} from "../../features/product/productSelectors";
import {fetchProductById} from "../../features/product/productThunks";
import {addToCartThunk,updateItemQuantityThunk} from "../../features/cart/cartThunks";
import {selectAuthIsAdmin,selectAuthIsAuthenticated} from "../../features/auth/authSelectors";
import ProductActions from "../../components/product/ProductActions";
import styles from "./styles/ProductDetail.module.css";

export default function ProductDetail(){
    const {productId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const product = useSelector(selectSelectedProduct);
    const isAdmin = useSelector(selectAuthIsAdmin);
    const isAuthenticated = useSelector(selectAuthIsAuthenticated);

    useEffect(() => {
        dispatch(fetchProductById(productId));
    }, [dispatch, productId]);

    if(!product) return <p>Loading...</p>;
  
  const handleAddToCart = (id) => {
    dispatch(addToCartThunk({ productId: id, quantity: 1 }));
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateItemQuantityThunk({ productId: id, quantity }));
  };

  const handleEdit = () => {
    navigate(`/edit-product/${product._id}`);
  };



  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.pageTitle}>Product Detail</h1>
      <div className={styles.container}>
        <div className={styles.imageSection}>
          <img src={product.imageURL} alt={product.name} className={styles.image} />
        </div>
        <div className={styles.infoSection}>
          <p className={styles.category}>Category: {product.category}</p>
          <h2 ame={styles.title}>{product.name}</h2>
          <p className={styles.price}>Price: ${product.price}</p>  
          <div className={styles.stockWrapper}>
            {product.stock > 0 ? (
              <span className={styles.inStock}>In Stock</span>
            ) : (
              <span className={styles.outOfStock}>Out of Stock</span>
            )}
            <p className={styles.stock}>Stock: {product.stock}</p>
          </div> 
          <p className={styles.description}>Description: {product.description}</p>
      
          <div className={styles.actions}>
            <ProductActions
              product={product}
              isAdmin={isAdmin}
              isAuthenticated={isAuthenticated}
              onAddToCart={handleAddToCart}
              onUpdateQuantity={handleUpdateQuantity}
              onEdit={handleEdit}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {selectSelectedProduct} from "../../features/product/productSelectors";
import {fetchProductById} from "../../features/product/productThunks";
import {addToCartThunk,updateItemQuantityThunk} from "../../features/cart/cartThunks";
import {selectAuthIsAdmin,selectAuthIsAuthenticated} from "../../features/auth/authSelectors";
import ProductActions from "../../components/product/ProductActions";
import styles from "./ProductDetail.module.css";

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
    <div className={styles.container}>
      <img src={product.imageURL} alt={product.name} className={styles.image} />
      <h2 ame={styles.title}>{product.name}</h2>
      <p className={styles.details}>Description: {product.description}</p>
      <p className={styles.details}>Category: {product.category}</p>
      <p className={styles.details}>Stock: {product.stock}</p>
      <p className={styles.price}>Price: ${product.price}</p>

      <ProductActions
        product={product}
        isAdmin={isAdmin}
        isAuthenticated={isAuthenticated}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
        onEdit={handleEdit}
      />
    </div>
  );
}
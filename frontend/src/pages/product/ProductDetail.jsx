import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {selectSelectedProduct} from "../../features/product/productSelectors";
import {fetchProductById} from "../../features/product/productThunks";
import {addToCartThunk,updateItemQuantityThunk} from "../../features/cart/cartThunks";
import {selectAuthIsAdmin,selectAuthIsAuthenticated} from "../../features/auth/authSelectors";
import ProductActions from "../../components/product/ProductActions";

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
    <div style={{ textAlign: "center" }}>
      <img src={product.imageURL} alt={product.name} style={{}} />
      <h2>{product.name}</h2>
      <p>Description: {product.description}</p>
      <p>Category: {product.category}</p>
      <p>Stock: {product.stock}</p>
      <p>Price: ${product.price}</p>

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
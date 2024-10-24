import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { products } from "../../data/product.js";
import "./ProductList.css";

function ProductList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!auth.currentUser) {
          navigate("/login");
          return;
        }
        setLoading(false);
      } catch (err) {
        console.error("Error checking authentication:", err);
        setError("An error occurred while loading products. Please try again.");
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  const handleAddToCart = async (product) => {
    if (!auth.currentUser) {
      navigate("/login");
      return;
    }

    try {
      // Implement your addToCart logic here
      console.log("Product added to cart:", product);
      // You might want to show a success message to the user here
    } catch (err) {
      console.error("Error adding product to cart:", err.message);
      setError("Failed to add product to cart. Please try again.");
    }
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="product-list-container">
      <h2>Our Offers</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <div className="product-details">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="add-to-cart-btn"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;

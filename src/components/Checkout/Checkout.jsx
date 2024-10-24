import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../modules/order";
import { clearCart } from "../../app/action/cartSlice";
import { auth } from "../../firebase";
import "./Checkout.css";

function Checkout() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!auth.currentUser) {
      navigate("/login");
      return;
    }

    try {
      const orderData = {
        items: cartItems,
        shippingInfo,
        totalAmount,
      };

      await createOrder(auth.currentUser.uid, orderData);
      dispatch(clearCart());
      setOrderConfirmed(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error submitting order:", error);
      setError("Failed to place order. Please try again.");
      setIsLoading(false);
    }
  };

  if (orderConfirmed) {
    return (
      <div className="order-confirmation">
        <h2>Order Confirmed!</h2>
        <p>Thank you for your order.</p>
        <button onClick={() => navigate("/")}>Return to Home</button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="checkout-content">
        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <div className="checkout-items">
            {cartItems.map((item) => (
              <div key={item.id} className="checkout-item">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p className="item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="checkout-total">
            <h3>
              Total: <span>${totalAmount.toFixed(2)}</span>
            </h3>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="checkout-form">
          <h2>Shipping Information</h2>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={shippingInfo.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={shippingInfo.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={shippingInfo.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="zipCode">Zip Code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={shippingInfo.zipCode}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={shippingInfo.country}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="place-order-btn"
            disabled={isLoading}
          >
            {isLoading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;

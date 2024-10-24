import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrder } from "../../modules/order";
import { auth } from "../../firebase";
import "./OrderConfirmation.css";

function OrderConfirmation() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      if (!auth.currentUser) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        const fetchedOrder = await getOrder(orderId);
        setOrder(fetchedOrder);
      } catch (error) {
        console.error("Error fetching order:", error);
        setError("Failed to load order details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

  if (loading) return <div>Loading order details...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!order) return <div>Order not found.</div>;

  return (
    <div>
      <h2>Order Confirmation</h2>
      <p>Thank you for your order!</p>
      <h3>Order Details</h3>
      <p>Order ID: {order.id}</p>
      <p>Status: {order.status}</p>
      <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
      <p>Date: {new Date(order.createdAt.toDate()).toLocaleString()}</p>
      <h4>Items:</h4>
      <ul>
        {order.items.map((item, index) => (
          <li key={index}>
            {item.productName} - Quantity: {item.quantity} - Price: $
            {item.price.toFixed(2)}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/orders")}>View All Orders</button>
    </div>
  );
}

export default OrderConfirmation;

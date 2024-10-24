import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserOrders } from "../../modules/order";
import { auth } from "../../firebase";
import "./OrderList.css";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!auth.currentUser) {
        console.log("No authenticated user, redirecting to login");
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        console.log("Fetching orders for user:", auth.currentUser.uid);
        const fetchedOrders = await getUserOrders(auth.currentUser.uid);
        console.log("Fetched orders:", fetchedOrders);
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(`Failed to load orders. Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) return <div className="loading">Loading orders...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (orders.length === 0)
    return <div className="no-orders">No orders found.</div>;

  return (
    <div className="order-list-container">
      <h2 className="order-list-title">Your Orders</h2>
      <div className="order-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-image">
              <img
                src={
                  order.items && order.items[0] ? order.items[0].image : null
                }
                alt={
                  order.items && order.items[0] ? order.items[0].name : "Order"
                }
              />
            </div>
            <div className="order-content">
              <div className="order-header">
                <h3>Order #{order.id.slice(-6)}</h3>
                <span className={`order-status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>
              <div className="order-details">
                <p className="order-date">
                  <i className="fas fa-calendar-alt"></i>{" "}
                  {new Date(order.createdAt.toDate()).toLocaleString()}
                </p>
                <p className="order-amount">
                  <i className="fas fa-dollar-sign"></i> Total: $
                  {order.totalAmount.toFixed(2)}
                </p>
              </div>
              <Link to={`/orders/${order.id}`} className="view-details-button">
                View Details <i className="fas fa-chevron-right"></i>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderList;

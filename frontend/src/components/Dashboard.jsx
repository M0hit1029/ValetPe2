import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://6c7ae0fa8407.ngrok-free.app/orders', { withCredentials: true })
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        if (err.response && err.response.status === 401) {
          navigate('/login');
        } else {
          setError("Error fetching orders");
        }
      });
  }, [navigate]);

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 24 }}>
      <h1>Last 60 Days Orders</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <ul>
          {orders.length === 0 && <li>No orders found.</li>}
          {orders.map(order => (
            <li key={order.orderid}>
              <strong>Order ID:</strong> {order.orderid} | <strong>Status:</strong> {order.status} | <strong>Created At:</strong> {new Date(order.createdat).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
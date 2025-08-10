import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('https://6c7ae0fa8407.ngrok-free.app/orders', { withCredentials: true })
      .then(res => setOrders(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Last 60 days orders</h1>
      <ul>
        {orders.map(order => (
          <li key={order.order_id}>
            Order ID: {order.order_id} | Status: {order.status} | Created At: {new Date(order.created_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;

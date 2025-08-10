// frontend/src/Dashboard.js
import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://6c7ae0fa8407.ngrok-free.app/orders', { withCredentials: true })
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError("Error fetching orders");
      });
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      padding: "40px 20px",
      fontFamily: "Arial, sans-serif",
      color: "black"
    }}>
      <h1 style={{
        textAlign: "center",
        marginBottom: 30,
        color: "black",
        textShadow: "0px 2px 4px rgba(0,0,0,0.2)"
      }}>
        📦 Last 60 Days Orders
      </h1>

      {loading && <p style={{ textAlign: "center", color: "black" }}>Loading...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {!loading && !error && orders.length === 0 && <p style={{ textAlign: "center", color: "black" }}>No orders found.</p>}

      {!loading && !error && orders.length > 0 && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px"
        }}>
          {orders.map(order => (
            <div key={order.orderid} style={{
              backdropFilter: "blur(10px)",
              background: "rgba(255, 255, 255, 0.15)",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              color: "black",
              border: "1px solid rgba(255,255,255,0.3)"
            }}>
              {/* Image section */}
              {order.images && order.images.length > 0 ? (
                <img
                  src={order.images[0]}
                  alt={`Order ${order.orderid} main`}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover"
                  }}
                />
              ) : (
                <div style={{
                  width: "100%",
                  height: "180px",
                  background: "rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  color: "#eee"
                }}>
                  No Image
                </div>
              )}

              {/* Details section */}
              <div style={{ padding: "16px" }}>
                <h3 style={{ marginBottom: "8px", fontWeight: "bold" }}>Order #{order.orderid}</h3>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Created:</strong> {new Date(order.createdat).toLocaleString()}</p>
                {order.reason && <p><strong>Reason:</strong> {order.reason}</p>}
                {order.qty && <p><strong>Quantity:</strong> {order.qty}</p>}

                {/* Small thumbnails for extra images */}
                {order.images && order.images.length > 1 && (
                  <div style={{
                    display: "flex",
                    gap: "6px",
                    marginTop: "10px",
                    flexWrap: "wrap"
                  }}>
                    {order.images.slice(1).map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Order ${order.orderid} item ${idx + 2}`}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "6px",
                          border: "1px solid rgba(255,255,255,0.3)"
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;

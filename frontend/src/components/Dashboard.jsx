// frontend/src/Dashboard.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import StatusBadge from './StatusBadge';

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

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

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderid.toString().includes(searchTerm) ||
                         order.shop.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesStatus = true;
    if (statusFilter !== 'all') {
      const orderStatus = (order.status || '').toLowerCase();
      switch (statusFilter) {
        case 'fulfilled':
          matchesStatus = orderStatus.includes('fulfilled');
          break;
        case 'unfulfilled':
          matchesStatus = orderStatus.includes('unfulfilled') || orderStatus === '' || orderStatus === 'null';
          break;
        case 'pending':
          matchesStatus = orderStatus.includes('pending') || orderStatus.includes('processing');
          break;
        case 'cancelled':
          matchesStatus = orderStatus.includes('cancelled') || orderStatus.includes('canceled');
          break;
        default:
          matchesStatus = true;
      }
    }
    
    return matchesSearch && matchesStatus;
  });

  const getOrderStats = () => {
    const total = orders.length;
    const fulfilled = orders.filter(o => o.status?.toLowerCase().includes('fulfilled')).length;
    const pending = orders.filter(o => o.status?.toLowerCase().includes('unfulfilled') || 
                                      o.status?.toLowerCase().includes('pending')).length;
    const cancelled = orders.filter(o => o.status?.toLowerCase().includes('cancelled')).length;
    
    return { total, fulfilled, pending, cancelled };
  };

  const stats = getOrderStats();
  return (
    <div style={{
      minHeight: "calc(100vh - 70px)",
      padding: "40px 20px",
      fontFamily: "Arial, sans-serif",
      color: "black",
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header Section */}
        <div style={{
          textAlign: "center",
          marginBottom: 40
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '10px'
          }}>
            📦 Order Dashboard
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#6b7280',
            margin: 0
          }}>
            Last 60 days order overview and management
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '30px',
            borderRadius: '20px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>📊</div>
            <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea', margin: '0 0 5px 0' }}>
              {stats.total}
            </h3>
            <p style={{ color: '#6b7280', margin: 0, fontSize: '16px' }}>Total Orders</p>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '30px',
            borderRadius: '20px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>✅</div>
            <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981', margin: '0 0 5px 0' }}>
              {stats.fulfilled}
            </h3>
            <p style={{ color: '#6b7280', margin: 0, fontSize: '16px' }}>Fulfilled</p>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '30px',
            borderRadius: '20px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>⏳</div>
            <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b', margin: '0 0 5px 0' }}>
              {stats.pending}
            </h3>
            <p style={{ color: '#6b7280', margin: 0, fontSize: '16px' }}>Pending</p>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '30px',
            borderRadius: '20px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>❌</div>
            <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: '#ef4444', margin: '0 0 5px 0' }}>
              {stats.cancelled}
            </h3>
            <p style={{ color: '#6b7280', margin: 0, fontSize: '16px' }}>Cancelled</p>
          </div>
        </div>

        {/* Filters */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '30px',
          borderRadius: '20px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            alignItems: 'end'
          }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#374151'
              }}>
                🔍 Search Orders
              </label>
              <input
                type="text"
                placeholder="Search by order ID or shop name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#374151'
              }}>
                📋 Filter by Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  background: 'white',
                  cursor: 'pointer',
                  boxSizing: 'border-box'
                }}
              >
                <option value="all">All Statuses</option>
                <option value="fulfilled">Fulfilled</option>
                <option value="unfulfilled">Unfulfilled</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div style={{
            textAlign: "center",
            padding: '60px',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>⏳</div>
            <p style={{ fontSize: '18px', color: '#6b7280' }}>Loading your orders...</p>
          </div>
        )}
        
        {error && (
          <div style={{
            textAlign: "center",
            padding: '60px',
            background: 'rgba(239, 68, 68, 0.1)',
            borderRadius: '20px',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>❌</div>
            <p style={{ fontSize: '18px', color: '#ef4444', fontWeight: '600' }}>{error}</p>
          </div>
        )}
        
        {!loading && !error && filteredOrders.length === 0 && orders.length > 0 && (
          <div style={{
            textAlign: "center",
            padding: '60px',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>🔍</div>
            <p style={{ fontSize: '18px', color: '#6b7280' }}>No orders match your current filters.</p>
          </div>
        )}
        
        {!loading && !error && orders.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: '60px',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>📦</div>
            <p style={{ fontSize: '18px', color: '#6b7280' }}>No orders found for the last 60 days.</p>
          </div>
        )}

        {/* Orders Grid */}
        {!loading && !error && filteredOrders.length > 0 && (
          <>
            <div style={{
              marginBottom: '20px',
              padding: '0 10px'
            }}>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                margin: 0
              }}>
                Showing {filteredOrders.length} of {orders.length} orders
              </p>
            </div>
            
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "25px"
        }}>
          {filteredOrders.map(order => (
            <div key={order.orderid} style={{
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
              color: "black",
              border: "1px solid rgba(255,255,255,0.3)",
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}>
              {/* Image section */}
              {order.images && order.images.length > 0 ? (
                <img
                  src={order.images[0]}
                  alt={`Order ${order.orderid} main`}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    transition: 'transform 0.3s ease'
                  }}
                />
              ) : (
                <div style={{
                  width: "100%",
                  height: "200px",
                  background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px"
                }}>
                  <div style={{ fontSize: '40px' }}>📦</div>
                  <span style={{ fontSize: "14px", color: "#9ca3af", fontWeight: '500' }}>
                    No Image Available
                  </span>
                </div>
              )}

              {/* Details section */}
              <div style={{ padding: "25px" }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '15px'
                }}>
                  <h3 style={{ 
                    margin: 0, 
                    fontWeight: "bold", 
                    fontSize: '20px',
                    color: '#1f2937'
                  }}>
                    Order #{order.orderid}
                  </h3>
                  <StatusBadge status={order.status} />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <p style={{ 
                    margin: '8px 0', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    fontSize: '14px',
                    color: '#6b7280'
                  }}>
                    <span style={{ fontSize: '16px' }}>🏪</span>
                    <strong>Shop:</strong> {order.shop}
                  </p>
                  <p style={{ 
                    margin: '8px 0', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    fontSize: '14px',
                    color: '#6b7280'
                  }}>
                    <span style={{ fontSize: '16px' }}>📅</span>
                    <strong>Created:</strong> {new Date(order.createdat).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  {order.qty && (
                    <p style={{ 
                      margin: '8px 0', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      fontSize: '14px',
                      color: '#6b7280'
                    }}>
                      <span style={{ fontSize: '16px' }}>📦</span>
                      <strong>Quantity:</strong> {order.qty}
                    </p>
                  )}
                  {order.reason && (
                    <p style={{ 
                      margin: '8px 0', 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '8px',
                      fontSize: '14px',
                      color: '#6b7280'
                    }}>
                      <span style={{ fontSize: '16px', marginTop: '2px' }}>💭</span>
                      <span><strong>Reason:</strong> {order.reason}</span>
                    </p>
                  )}
                </div>

                {/* Small thumbnails for extra images */}
                {order.images && order.images.length > 1 && (
                  <>
                    <div style={{
                      borderTop: '1px solid #e5e7eb',
                      paddingTop: '15px',
                      marginTop: '15px'
                    }}>
                      <p style={{
                        fontSize: '12px',
                        color: '#9ca3af',
                        margin: '0 0 10px 0',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        Additional Images ({order.images.length - 1})
                      </p>
                  <div style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap"
                  }}>
                    {order.images.slice(1).map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Order ${order.orderid} item ${idx + 2}`}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "10px",
                          border: "2px solid rgba(255,255,255,0.8)",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          transition: 'transform 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)';
                        }}
                      />
                    ))}
                  </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

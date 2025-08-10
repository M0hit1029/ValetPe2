import React, { useState } from 'react';

export default function Login() {
  const [appDomain, setAppDomain] = useState('');
  const [shopName, setShopName] = useState('');

  const handleLogin = () => {
    if (!appDomain || !shopName) {
      alert('Please enter both App Domain and Shop Name');
      return;
    }
    window.location.href = `https://6c7ae0fa8407.ngrok-free.app/auth?shop=${shopName}.myshopify.com`;
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 70px)',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      fontFamily: 'Arial, sans-serif',
      padding: '40px 20px'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '50px',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <div style={{
          fontSize: '60px',
          marginBottom: '20px'
        }}>
          🔐
        </div>
        <h1 style={{ 
          marginBottom: '30px', 
          color: '#333',
          fontSize: '28px',
          fontWeight: 'bold'
        }}>
          Connect with Shopify
        </h1>
        <p style={{
          color: '#6b7280',
          marginBottom: '30px',
          fontSize: '16px',
          lineHeight: '1.5'
        }}>
          Enter your store details to connect and start managing your orders
        </p>

        <input
          type="text"
          placeholder="Enter App Domain (without https://)"
          value={appDomain}
          onChange={(e) => setAppDomain(e.target.value)}
          style={{
            width: '100%',
            padding: '16px 20px',
            marginBottom: '20px',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '16px',
            transition: 'all 0.3s ease',
            outline: 'none',
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

        <input
          type="text"
          placeholder="Enter Shop Name (e.g. valettrial)"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          style={{
            width: '100%',
            padding: '16px 20px',
            marginBottom: '30px',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '16px',
            transition: 'all 0.3s ease',
            outline: 'none',
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

        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            fontSize: '18px',
            fontWeight: '600',
            padding: '18px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.4)';
          }}
        >
          🚀 Connect to Shopify
        </button>
        
        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: 'rgba(102, 126, 234, 0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(102, 126, 234, 0.1)'
        }}>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            margin: 0,
            lineHeight: '1.5'
          }}>
            🔒 Your connection is secure and encrypted. We only access the data you authorize.
          </p>
        </div>
      </div>
    </div>
  );
}

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
      minHeight: '100vh',
      background: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: '#fff',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center'
      }}>
        <h1 style={{ marginBottom: '24px', color: '#333' }}>Login with Shopify</h1>

        <input
          type="text"
          placeholder="Enter App Domain (without https://)"
          value={appDomain}
          onChange={(e) => setAppDomain(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '6px'
          }}
        />

        <input
          type="text"
          placeholder="Enter Shop Name (e.g. valettrial)"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '20px',
            border: '1px solid #ccc',
            borderRadius: '6px'
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            fontSize: '1.1em',
            padding: '12px',
            background: '#2e86de',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Connect Shopify
        </button>
      </div>
    </div>
  );
}

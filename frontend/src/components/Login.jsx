import React from 'react';

export default function Login() {
  const handleLogin = () => {
    window.location.href = 'https://6c7ae0fa8407.ngrok-free.app/auth?shop=valettrial.myshopify.com';
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Login with Shopify</h1>
      <button onClick={handleLogin} style={{ fontSize: '1.2em', padding: '10px 24px' }}>
        Connect Shopify
      </button>
    </div>
  );
}
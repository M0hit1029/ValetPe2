import React from 'react';

export default function Login() {
  const handleLogin = () => {
    // Redirect the browser to your backend's Shopify login route
    window.location.href = 'https://6c7ae0fa8407.ngrok-free.app/auth?shop=valettrial.myshopify.com';
  };

  return (
    <div>
      <h1>Login with Shopify</h1>
      <button onClick={handleLogin}>Connect Shopify</button>
    </div>
  );
}

import React, { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="app-container">
      <header>
        <h1>Simple E-commerce Store</h1>
      </header>
      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product._id}>
            <img src={product.image || "https://via.placeholder.com/150"} alt={product.name} />
            <h2>{product.name}</h2>
            <p className="price">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

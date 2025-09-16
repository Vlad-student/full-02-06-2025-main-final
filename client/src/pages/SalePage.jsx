import React, { useEffect } from "react";
import { useState } from "react";

const SalePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProductsOnSale();
  }, []);

  const fetchProductsOnSale = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/products/sale");
      const data = await response.json();

      if (data.success) {
        setProducts(data.data);
      } else {
        setError("Failed to fetch products");
      }
    } catch (error) {
      setError("Error fetching products: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Products on Sale</h1>

      {products.length === 0 ? (
        <div>
          <p>No products on sale at the moment.</p>
        </div>
      ) : (
        <div>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SalePage;

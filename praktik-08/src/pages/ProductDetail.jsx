import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Laptop",
      price: 12000000,
      category: "Electronics",
      description:
        "Laptop spesifikasi tinggi untuk kebutuhan programming dan desain.",
    },
    {
      id: 2,
      name: "Smartphone",
      price: 5000000,
      category: "Electronics",
      description:
        "Smartphone terbaru dengan kamera canggih dan baterai tahan lama.",
    },
    {
      id: 3,
      name: "Headphones",
      price: 800000,
      category: "Electronics",
      description:
        "Headphone dengan fitur noise cancelling untuk pengalaman musik terbaik.",
    },
    {
      id: 4,
      name: "Book",
      price: 150000,
      category: "Education",
      description: "Buku panduan lengkap belajar React JS untuk pemula.",
    },
    {
      id: 5,
      name: "Desk Lamp",
      price: 300000,
      category: "Home",
      description:
        "Lampu meja LED hemat energi dengan pengaturan tingkat kecerahan.",
    },
  ];

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="page product-detail">
        <h2>Product not found!</h2>
        <button
          onClick={() => navigate("/products")}
          className="btn btn-primary"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="page product-detail-page">
      <h1>Product Detail</h1>
      <div className="product-detail">
        <h2>{product.name}</h2>
        <div className="product-info">
          <p className="price">Rp {product.price.toLocaleString("id-ID")}</p>
          <p className="category">Category: {product.category}</p>
          <p className="description">{product.description}</p>
        </div>
        <div className="product-actions">
          <button onClick={() => navigate(-1)} className="btn btn-secondary">
            &larr; Back
          </button>
          <button
            onClick={() => alert("Product added to cart!")}
            className="btn btn-primary"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

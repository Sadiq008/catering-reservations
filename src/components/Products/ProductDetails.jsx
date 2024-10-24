import { useParams, Link } from "react-router-dom";
import gourmet from "../../assets/images/gourmet.avif";
import deluxe from "../../assets/images/deluxe.png";
import desserts from "../../assets/images/desserts.avif";
import "./ProductDetails.css";

const productDetails = {
  1: {
    name: "Gourmet Platter",
    price: 99.99,
    description:
      "Our Gourmet Platter is a feast for the senses. It features an exquisite selection of artisanal cheeses, cured meats, fresh fruits, and gourmet crackers. Perfect for sophisticated gatherings or as an impressive appetizer spread.",
    serves: "10-12 people",
    ingredients:
      "Aged cheddar, brie, prosciutto, salami, grapes, strawberries, figs, almonds, walnuts, artisanal crackers",
    image: gourmet,
  },
  2: {
    name: "Deluxe Buffet",
    price: 199.99,
    description:
      "Our Deluxe Buffet offers a wide array of hot and cold dishes to satisfy every palate. From savory entrees to fresh salads and decadent desserts, this buffet is perfect for large events and celebrations.",
    serves: "20-25 people",
    ingredients:
      "Roast beef, grilled chicken, vegetarian lasagna, mixed green salad, roasted vegetables, assorted dinner rolls, chocolate mousse",
    image: deluxe,
  },
  3: {
    name: "Elegant Desserts",
    price: 79.99,
    description:
      "Indulge in our Elegant Desserts platter, featuring a delightful assortment of miniature pastries and sweets. These bite-sized treats are perfect for adding a touch of luxury to any event.",
    serves: "15-20 people",
    ingredients:
      "Mini chocolate éclairs, fruit tarts, macarons, cheesecake bites, chocolate-dipped strawberries, petit fours",
    image: desserts,
  },
};

function ProductDetails() {
  const { id } = useParams();
  const product = productDetails[id];

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-details-container">
      <h1>{product.name}</h1>
      <div className="product-details-content">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-info">
          <p className="product-description">{product.description}</p>
          <p className="product-price">Price: ${product.price.toFixed(2)}</p>
          <p className="product-serves">Serves: {product.serves}</p>
          <h3>Ingredients:</h3>
          <p className="product-ingredients">{product.ingredients}</p>
          <Link to="/products" className="back-button">
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

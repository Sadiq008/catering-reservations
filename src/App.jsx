import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import ProductList from "./components/Products/ProductList";
import Cart from "./components/Cart/Cart";
import OrderList from "./components/Orders/OrderList";
import OrderConfirmation from "./components/Orders/OrderConfirmation";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import "./App.css";
import ProductDetails from "./components/Products/ProductDetails";
import Checkout from "./components/Checkout/Checkout";

import gourmetteImage from "./assets/images/gourmet.avif";
import buffetImage from "./assets/images/deluxe.png";
import dessertsImage from "./assets/images/desserts.avif";

function App() {
  const featuredProducts = [
    {
      id: "featured1",
      name: "Gourmet Platter",
      price: 99.99,
      image: gourmetteImage,
    },
    {
      id: "featured2",
      name: "Deluxe Buffet",
      price: 199.99,
      image: buffetImage,
    },
    {
      id: "featured3",
      name: "Elegant Desserts",
      price: 79.99,
      image: dessertsImage,
    },
  ];

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={<Home featuredProducts={featuredProducts} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/products"
            element={<ProductList featuredProducts={featuredProducts} />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/:orderId" element={<OrderConfirmation />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

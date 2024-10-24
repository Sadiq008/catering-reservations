import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/action/cartSlice.js";
import "./Home.css";
import { products } from "../../data/product.js";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { CgProfile, CgLogOut } from "react-icons/cg";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in:", user.uid);
        setUser(user);
      } else {
        console.log("No user is signed in.");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setDropdownOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const featuredProducts = products;

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <div className="home-container">
      <nav className="home-nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/products">Offers</Link>
          </li>
          {user && (
            <li>
              <Link to="/orders">Orders</Link>
            </li>
          )}
          {user ? (
            <li className="profile-dropdown" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="profile-button"
              >
                <CgProfile className="profile-icon" />
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <CgProfile className="dropdown-profile-icon" />
                    <div className="dropdown-user-info">
                      <p className="dropdown-email">{user.email}</p>
                    </div>
                  </div>

                  <div className="dropdown-divider"></div>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item logout-button"
                  >
                    <CgLogOut /> Logout
                  </button>
                </div>
              )}
            </li>
          ) : (
            <>
              <li>
                <Link to="/register" className="auth-button register-button">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="auth-button login-button">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <h1>Exquisite Catering for Your Special Events</h1>
          <p>
            Elevate your gatherings with our gourmet cuisine and impeccable
            service
          </p>
          <Link to="/products" className="cta-button">
            Explore Our Offers
          </Link>
        </div>
      </section>

      <section className="featured-products">
        <h2>Featured Offerings</h2>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <Link
                to={`/products/${product.id}`}
                className="view-details-button"
              >
                View Details
              </Link>
              <button
                onClick={() => handleAddToCart(product)}
                className="add-to-cart-button"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="about-us">
        <h2>About Our Catering Service</h2>
        <p>
          With years of experience and a passion for culinary excellence, we
          bring the finest dining experience to your events. From intimate
          gatherings to grand celebrations, we cater to all your needs with
          style and precision.
        </p>
        <Link to="/about" className="learn-more-button">
          Learn More About Us
        </Link>
      </section>

      <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>
              &ldquo;The food was absolutely amazing, and the service was
              impeccable. Our guests couldn&apos;t stop raving about the
              catering!&rdquo;
            </p>
            <p className="testimonial-author">- Sarah J., Wedding Reception</p>
          </div>
          <div className="testimonial-card">
            <p>
              &ldquo;Professional, punctual, and the food was delicious. They
              made our corporate event a great success.&rdquo;
            </p>
            <p className="testimonial-author">- Mark T., Corporate Gala</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

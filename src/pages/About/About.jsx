import { Link } from "react-router-dom";
import mariaImage from "../../assets/images/Maria-Rodriguez.jpg";
import JohnImage from "../../assets/images/John campbell.jpeg";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>Our Catering Journey</h1>
        <p className="subtitle">
          Bringing culinary excellence to your special events since 2010
        </p>
      </div>

      <section className="our-story">
        <h2>The Story Behind Our Flavors</h2>
        <p>
          Founded in 2010, our catering service has been bringing culinary
          delight to events across the city for over a decade. What started as a
          small family business has blossomed into a team of passionate food
          lovers, dedicated to creating unforgettable dining experiences.
        </p>
      </section>

      <section className="our-philosophy">
        <h2>Our Culinary Philosophy</h2>
        <p>
          At the heart of our success lies a simple yet powerful philosophy: use
          the freshest ingredients, prepare them with care, and serve them with
          style. We&apos;re committed to sustainability, sourcing local
          ingredients whenever possible, and minimizing our environmental
          impact. Every dish we create is a testament to our belief that great
          food can elevate any event from ordinary to extraordinary.
        </p>
      </section>

      <section className="our-team">
        <h2>The Faces Behind the Flavors</h2>
        <div className="team-members">
          <div className="team-member">
            <img src={mariaImage} alt="Head Chef" />
            <h3>Chef Maria Rodriguez</h3>
            <p>Head Chef with 20 years of experience in gourmet cuisine</p>
          </div>
          <div className="team-member">
            <img src={JohnImage} alt="Event Planner" />
            <h3>John Campbell</h3>
            <p>Expert Event Planner ensuring every detail is perfect</p>
          </div>
        </div>
      </section>

      <section className="our-services">
        <h2>Elevate Your Event</h2>
        <ul>
          <li>Elegant Wedding Receptions</li>
          <li>Impressive Corporate Events</li>
          <li>Memorable Birthday Celebrations</li>
          <li>Festive Holiday Gatherings</li>
          <li>Intimate Gourmet Dinners</li>
        </ul>
        <div className="button-container">
          <Link to="/products" className="view-menu-button">
            Explore Our Offerings
          </Link>
        </div>
      </section>
      <section className="contact-us">
        <h2>Let&apos;s Create Something Special</h2>
        <p>
          Ready to elevate your next event with our exquisite catering service?
          We&apos;re excited to bring our culinary expertise to your special
          occasion!
        </p>
        <Link to="/contact" className="contact-button">
          Get in Touch
        </Link>
      </section>
    </div>
  );
}

export default About;

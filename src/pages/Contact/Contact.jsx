import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import "./Contact.css";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", { name, email, message });
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");

    const formData = new FormData(event.target);

    formData.append("access_key", "af176d32-58c6-4d85-a890-05fa96e9b637");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Get in Touch</h1>
        <p>
          We&apos;d love to hear from you. Let&apos;s create something
          extraordinary together!
        </p>
      </div>

      <div className="contact-content">
        <div className="contact-form-container">
          {submitted ? (
            <div className="success-message">
              <h2>Thank You!</h2>
              <p>
                Your message has been sent successfully. We&apos;ll get back to
                you soon!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your Name"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Your Email"
                />
              </div>
              <div className="form-group">
                <textarea
                  id="message"
                  value={message}
                  name="message"
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          )}
        </div>

        <div className="contact-info">
          <h2>Contact Information</h2>
          <div className="info-item">
            <FaEnvelope className="icon" />
            <p>info@gourmetcatering.com</p>
          </div>
          <div className="info-item">
            <FaPhone className="icon" />
            <p>(555) 123-4567</p>
          </div>
          <div className="info-item">
            <FaMapMarkerAlt className="icon" />
            <p>123 Culinary Lane, Foodville, CA 90210</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

import React, { useState, useEffect } from "react";
import "../Styles/Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:9000/api/v1/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error("Failed");

    setSuccess("Thank you! Your message has been sent successfully.");
    setError("");
    setFormData({ name: "", email: "", phone: "", message: "" });
  } catch (err) {
    setError("Failed to send message. Try again.");
    setSuccess("");
  }
};


  // Auto hide messages after 3 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return (
    <div className="contactPage">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p className="contact-subtitle">
          Have questions about Park Mate or need assistance?  
          We’re here to help you.
        </p>

        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Send Message</button>
        </form>

        {success && <p className="contact-success">{success}</p>}
        {error && <p className="contact-error">{error}</p>}

        {/* Contact Info */}
        <div className="contact-info">
          <p><strong>Email:</strong> support@parkmate.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Location:</strong> Bengaluru, India</p>
        </div>
      </div>
    </div>
  );
}

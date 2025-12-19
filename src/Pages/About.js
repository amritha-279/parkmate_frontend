import "../Styles/About.css";
import { FaClock, FaShieldAlt, FaMapMarkerAlt } from "react-icons/fa";

const features = [
  { id: 1, icon: <FaShieldAlt />, title: "Trusted & Secure", desc: "Reliable system ensuring your parking is safe and secure." },
  { id: 2, icon: <FaClock />, title: "Real-time Booking", desc: "Check availability and book slots instantly." },
  { id: 3, icon: <FaMapMarkerAlt />, title: "Citywide Access", desc: "Find and reserve slots anywhere in the city easily." },
];

const About = () => {
  return (
    <div className="aboutWrapper">
      <div className="aboutContainer">
        <h1>About Park Mate</h1>
        <p>
          Park Mate is a smart parking management solution designed to simplify
          the way people find and reserve parking spaces in busy environments.
        </p>
        <p>
          Built with a focus on reliability, transparency, and user trust,
          Park Mate provides real-time parking availability and a seamless
          booking experience.
        </p>
        <p>
          Our mission is to reduce parking stress, save time, and promote
          efficient space utilization through smart technology.
        </p>

        {/* Features Section */}
        <div className="aboutFeatures">
          {features.map(feature => (
            <div key={feature.id} className="featureCard">
              <div className="featureIcon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;

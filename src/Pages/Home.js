import { useNavigate } from "react-router-dom";
import "../Styles/Home.css";
import TownSlot from "../Images/townslot.jpg";
import AirportSlot from "../Images/airportslot.jpg";
import MallSlot from "../Images/mallslot.jpg";
import ParkingBg from "../Images/parking.png"; // hero background
import { FaShieldAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const categories = [
  { id: 1, title: "Town Slot Booking", img: TownSlot, link: "/parking?type=town" },
  { id: 2, title: "Airport Slot Booking", img: AirportSlot, link: "/parking?type=airport" },
  { id: 3, title: "Mall Slot Booking", img: MallSlot, link: "/parking?type=mall" },
];


const aboutPoints = [
  { id: 1, icon: <FaShieldAlt />, text: "Trusted and reliable parking system" },
  { id: 2, icon: <FaClock />, text: "Real-time availability & quick booking" },
  { id: 3, icon: <FaMapMarkerAlt />, text: "Book anywhere in the city easily" },
];

const Home = () => {
  //const { data } = useOutletContext();
  const navigate = useNavigate();

  return (
    <div className="homePage">
      {/* Hero Section */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${ParkingBg})` }}
      >
        <div className="heroOverlay">
          <h1 className="heroTitle">Park Mate</h1>
          <p className="heroSubtitle">
            Find, book, and manage parking slots instantly with Park Mate
          </p>
          <button
            className="heroBtn"
            onClick={() => navigate("/parking")}
          >
            Explore Slots
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="aboutBrand">
        <h2>About Park Mate</h2>
        <div className="aboutPoints">
          {aboutPoints.map((point) => (
            <div key={point.id} className="aboutPoint">
              <div className="aboutIcon">{point.icon}</div>
              <p>{point.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Book Your Slot</h2>
        <div className="categoryContainer">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="categoryCard"
              onClick={() => navigate(cat.link)}
            >
              <img src={cat.img} alt={cat.title} />
              <h3>{cat.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 Park Mate. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

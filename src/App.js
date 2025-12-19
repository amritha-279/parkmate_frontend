import React, { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "./App.css";
import carlogo from "./carlogo.png";

function App() {
  const [data, setData] = useState({
    town: [],
    mall: [],
    airport: [],
  });

  const location = useLocation();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [townRes, airportRes, mallRes] = await Promise.all([
          fetch("https://parkmate-backend-353z.onrender.com/api/v1/parking/location/Town")
,
          fetch("https://parkmate-backend-353z.onrender.com/api/v1/parking/location/Airport")
,
          fetch("https://parkmate-backend-353z.onrender.com/api/v1/parking/location/Match")
,
        ]);

        const townJson = await townRes.json();
        const airportJson = await airportRes.json();
        const mallJson = await mallRes.json();

        console.log("Town:", townJson.data);
        console.log("Airport:", airportJson.data);
        console.log("Mall:", mallJson.data);

        setData({
          town: townJson.data || [],
          airport: airportJson.data || [],
          mall: mallJson.data || [],
        });
      } catch (err) {
        console.error("Failed to fetch parking data:", err);
      }
    };

    fetchAllData();
  }, []);

  const hideNavbar = location.pathname === "/";

  return (
    <div className="appWrapper">
      {!hideNavbar && (
        <nav className="header">
          <div className="logo">
            <img src={carlogo} alt="Logo" />
          </div>

          <div className="links">
            <Link to="/">Login</Link>
            <Link to="/home">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/parking">Parking</Link>
            <Link to="/records">Records</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </nav>
      )}

      <Outlet context={{ data, setData }} />
    </div>
  );
}

export default App;

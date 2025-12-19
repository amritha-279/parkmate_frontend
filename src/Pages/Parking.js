import { useState, useEffect } from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import "../Styles/Parking.css";

const Parking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useOutletContext();

  const [activeType, setActiveType] = useState("town");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    if (type === "town" || type === "mall" || type === "airport") {
      setActiveType(type);
    }
  }, [location.search]);

  const slotData = data?.[activeType] || [];

  const handleSlotClick = (slot) => {
    if (slot.status === "available") {
      navigate("/addParking", {
        state: {
          mongoId: slot._id,     // ✅ REQUIRED for backend
          slotId: slot.slotId,
          slotType: activeType,
        },
      });
    } else {
      alert("This slot is already occupied!");
    }
  };

  return (
    <div className="parkingPage">
      <h1>{activeType.toUpperCase()} Slot Booking</h1>

      <div className="slotTypeButtons">
        {["town", "airport", "mall"].map((type) => (
          <button
            key={type}
            className={activeType === type ? "active" : ""}
            onClick={() => setActiveType(type)}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="slotContainer">
        {slotData.map((slot) => (
          <div
            key={slot._id}
            className={`slotCard ${slot.status}`}
            onClick={() => handleSlotClick(slot)}
            style={{
              cursor: slot.status === "available" ? "pointer" : "not-allowed",
            }}
          >
            <h3>Slot {slot.slotId}</h3>
            <p>Status: {slot.status}</p>

            {slot.status === "occupied" && (
              <>
                <p>Vehicle: {slot.vehicleNumber}</p>
                <p>Owner: {slot.ownerName}</p>
                <p>Date: {slot.date}</p>
                <p>Entry: {slot.entryTime}</p>
                <p>Exit: {slot.exitTime || "N/A"}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Parking;

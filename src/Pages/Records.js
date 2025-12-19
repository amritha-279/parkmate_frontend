import { useEffect, useState } from "react";
import "../Styles/Records.css";

const Records = () => {
  const [records, setRecords] = useState([]);
  const [activeType, setActiveType] = useState("Town");

  useEffect(() => {
    fetch("http://localhost:9000/api/v1/parking/records/all")
      .then((res) => res.json())
      .then((data) => setRecords(data.records || []))
      .catch((err) => console.error(err));
  }, []);

  // filter records based on selected location
  const filteredRecords = records.filter(
    (slot) => slot.location === activeType
  );

  return (
    <div className="recordsPage">
      <h1>{activeType} Parking Records</h1>

      {/* Location Filter Buttons */}
      <div className="slotTypeButtons">
        {["Town", "Airport", "Mall"].map((type) => (
          <button
            key={type}
            className={activeType === type ? "active" : ""}
            onClick={() => setActiveType(type)}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      {filteredRecords.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "40px" }}>
          No parking records found for {activeType}
        </p>
      ) : (
        <table className="recordsTable">
          <thead>
            <tr>
              <th>#</th>
              <th>Owner</th>
              <th>Vehicle</th>
              <th>Slot</th>
              <th>Date</th>
              <th>Entry</th>
              <th>Exit</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((slot, index) => (
              <tr key={slot._id}>
                <td>{index + 1}</td>
                <td>{slot.ownerName}</td>
                <td>{slot.vehicleNumber}</td>
                <td>{slot.slotId}</td>
                <td>{slot.date}</td>
                <td>{slot.entryTime}</td>
                <td>{slot.exitTime || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Records;

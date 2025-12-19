import "../Styles/ParkingForm.css";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";

const ParkingForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const { mongoId, slotId, slotType } = location.state || {};

  if (!mongoId || !slotId || !slotType) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        No slot selected!
      </h2>
    );
  }

  const onSubmitHandler = async (formData) => {
    try {
      /* 1️⃣ Update parking slot */
      const slotRes = await fetch(
        `http://localhost:9000/api/v1/parking/book/${mongoId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ownerName: formData.ownerName,
            vehicleNumber: formData.vehicleNumber,
            date: formData.date,
            entryTime: formData.timeIn,
            exitTime: formData.timeOut,
          }),
        }
      );

      if (!slotRes.ok) throw new Error("Slot update failed");

      /* 2️⃣ Create booking record (IMPORTANT) */
      const bookingRes = await fetch(
        "http://localhost:9000/api/v1/bookings",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slotId,
            location: slotType.charAt(0).toUpperCase() + slotType.slice(1),
            ownerName: formData.ownerName,
            vehicleNumber: formData.vehicleNumber,
            date: formData.date,
            entryTime: formData.timeIn,
            exitTime: formData.timeOut,
          }),
        }
      );

      if (!bookingRes.ok) throw new Error("Booking record failed");

      alert(`Slot ${slotId} booked successfully!`);
      reset();
      navigate(`/parking?type=${slotType}`);
    } catch (err) {
      console.error(err);
      alert("Failed to book slot. Try again.");
    }
  };

  return (
    <form className="simpleForm" onSubmit={handleSubmit(onSubmitHandler)}>
      <h1>Book Slot {slotId}</h1>

      <label>Owner Name</label>
      <input {...register("ownerName")} required />

      <label>Vehicle Number</label>
      <input {...register("vehicleNumber")} required />

      <label>Date</label>
      <input type="date" {...register("date")} required />

      <label>Time In</label>
      <input type="time" {...register("timeIn")} required />

      <label>Time Out</label>
      <input type="time" {...register("timeOut")} />

      <button type="submit">Book Slot</button>
    </form>
  );
};

export default ParkingForm;

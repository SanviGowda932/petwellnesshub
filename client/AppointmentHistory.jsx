import { useEffect, useState } from "react";

function AppointmentHistory() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div>
      <h2>Appointment History</h2>
      <ul>
        {appointments.map((appt) => (
          <li key={appt._id}>
            {appt.petName} - {appt.petOwner} - {appt.service} - {appt.date} - {appt.status} - {appt.paymentStatus}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentHistory;

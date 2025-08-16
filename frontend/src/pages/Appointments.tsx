import { useState } from "react";
import type { Booking, Customer, Service, StaffMember } from "../types";

type Props = {
  appointments: Booking[];
  setAppointments: React.Dispatch<React.SetStateAction<Booking[]>>;
  customers: Customer[];
  services: Service[];
  staff: StaffMember[];
};

export default function Appointments({ appointments, setAppointments, customers, services, staff }: Props) {
  const [formData, setFormData] = useState<Booking>({
    customer: "",
    email: "",
    date: "",
    time: "",
    service: "",
    staff: "",
    status: "pending",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Booking = {
      ...formData,
      _id: (globalThis.crypto && "randomUUID" in globalThis.crypto) ? crypto.randomUUID() : String(Date.now()),
    };
    setAppointments(prev => [...prev, newItem]);
    setFormData({ customer: "", email: "", date: "", time: "", service: "", staff: "", status: "pending" });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="card form">
        <input
          type="text"
          placeholder="Customer Name"
          value={formData.customer}
          onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
          list="customer-list"
          required
        />
        <datalist id="customer-list">
          {customers.map((c) => (
            <option key={(c.id ?? c.email) || c.name} value={c.name} />
          ))}
        </datalist>

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />

        <input
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          required
        />

        <select
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          required
        >
          <option value="">Select Service</option>
          {services.map((s) => (
            <option key={s._id ?? s.name} value={s.name}>
              {s.name} ({s.durationMins}m)
            </option>
          ))}
        </select>

        <select
          value={formData.staff}
          onChange={(e) => setFormData({ ...formData, staff: e.target.value })}
          required
        >
          <option value="">Select Staff</option>
          {staff.map((s) => (
            <option key={s.id ?? s.name} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>

        <button type="submit">Add Appointment</button>
      </form>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Date</th>
              <th>Time</th>
              <th>Service</th>
              <th>Staff</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a._id ?? `${a.email}-${a.date}-${a.time}`}>
                <td>{a.customer}</td>
                <td>{a.email}</td>
                <td>{a.date}</td>
                <td>{a.time}</td>
                <td>{a.service}</td>
                <td>{a.staff}</td>
                <td>{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

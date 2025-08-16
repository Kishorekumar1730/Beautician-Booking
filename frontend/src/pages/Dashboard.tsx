import type { Booking, Customer, Service, StaffMember } from "../types";

type Props = {
  appointments: Booking[];
  customers: Customer[];
  services: Service[];
  staff: StaffMember[];
};

export default function Dashboard({ appointments, customers, services, staff }: Props) {
  return (
    <>
      <div className="stats">
        <div className="stat-card">
          <div className="icon-box purple">📅</div>
          <div>
            <p>Total Bookings</p>
            <h2>{appointments.length}</h2>
          </div>
        </div>
        <div className="stat-card">
          <div className="icon-box pink">💲</div>
          <div>
            <p>Revenue (est.)</p>
            <h2>${appointments.length * 50}</h2>
          </div>
        </div>
        <div className="stat-card">
          <div className="icon-box violet">💎</div>
          <div>
            <p>Total Services</p>
            <h2>{services.length}</h2>
          </div>
        </div>
        <div className="stat-card">
          <div className="icon-box lavender">👩‍💼</div>
          <div>
            <p>Staff</p>
            <h2>{staff.length}</h2>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Recent Appointments</h3>
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {appointments.slice(-5).map((a) => (
                <tr key={a._id ?? `${a.email}-${a.date}-${a.time}`}>
                  <td>{a.customer}</td>
                  <td>{a.date}</td>
                  <td>{a.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <h3>Customers</h3>
          <ul className="profiles">
            {customers.slice(-4).map((c) => (
              <li key={c.id ?? c.email}>
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}`} alt="" />
                {c.name} <span>{c.email}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

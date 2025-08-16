// src/App.tsx
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Appointments from "./pages/Appointments";
import Services from "./pages/Services";
import Staff from "./pages/Staff";
import "./styles/dashboard.css";

import type { Service, Booking, Customer, StaffMember } from "./types";


export default function App() {
  const [appointments, setAppointments] = useState<Booking[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [page, setPage] = useState<
    "dashboard" | "appointments" | "customers" | "services" | "staff"
  >("dashboard");

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="brand">Beauty</h2>
        <nav>
          <button
            className={page === "dashboard" ? "active" : ""}
            onClick={() => setPage("dashboard")}
          >
            📊 Dashboard
          </button>
          <button
            className={page === "appointments" ? "active" : ""}
            onClick={() => setPage("appointments")}
          >
            📅 Appointments
          </button>
          <button
            className={page === "customers" ? "active" : ""}
            onClick={() => setPage("customers")}
          >
            👩 Customers
          </button>
          <button
            className={page === "services" ? "active" : ""}
            onClick={() => setPage("services")}
          >
            ✂ Services
          </button>
          <button
            className={page === "staff" ? "active" : ""}
            onClick={() => setPage("staff")}
          >
            👥 Staff
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <header>
          <h1>{page.charAt(0).toUpperCase() + page.slice(1)}</h1>
          <img
            className="profile-pic"
            src="https://ui-avatars.com/api/?name=Admin+User&background=f1d4d4&color=aa336a"
            alt="Profile"
          />
        </header>

        {page === "dashboard" && (
          <Dashboard
            appointments={appointments}
            customers={customers}
            services={services}
            staff={staff}
          />
        )}
        {page === "appointments" && (
          <Appointments
            appointments={appointments}
            setAppointments={setAppointments}
            customers={customers}
            services={services}
            staff={staff}
          />
        )}
        {page === "customers" && (
          <Customers customers={customers} setCustomers={setCustomers} />
        )}
        {page === "services" && (
          <Services services={services} setServices={setServices} />
        )}
        {page === "staff" && <Staff staff={staff} setStaff={setStaff} />}
      </main>
    </div>
  );
}

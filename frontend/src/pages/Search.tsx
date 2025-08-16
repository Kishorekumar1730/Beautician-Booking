// src/pages/Search.tsx
import { useEffect, useState } from "react";
import { api, withAuth } from "../api";
import { useAuth } from "../auth";
import type { Service, AvailabilityResponse } from "../types";
import { Link } from "react-router-dom";
import "../styles/search.css"; // Assuming you have styles for this page

export default function Search() {
  const [services, setServices] = useState<Service[]>([]);
  const [serviceId, setServiceId] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [results, setResults] = useState<AvailabilityResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { token } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get<Service[]>("/api/services");
        setServices(data);
      } catch (err) {
        console.error(err);
        setErrorMsg("Failed to load services. Please try again.");
      }
    })();
  }, []);

  const search = async () => {
    if (!serviceId || !date) {
      setErrorMsg("Please select a service and a date.");
      return;
    }
    setLoading(true);
    setErrorMsg(null);
    setResults(null);

    try {
      const { data } = await api.get<AvailabilityResponse>(
        "/api/bookings/search",
        { params: { serviceId, date } }
      );
      setResults(data);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to search for appointments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const book = async (beauticianId: string, startTime: string) => {
    if (!token) {
      alert("Please login to book");
      return;
    }
    try {
      await withAuth(token).post("/api/bookings", {
        serviceId,
        beauticianId,
        date,
        startTime,
      });
      alert("Pre-booked! Waiting for confirmation email.");
    } catch (err) {
      console.error(err);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <div className="page">
      <h2>Search</h2>
      <h3>Find an appointment</h3>

      <div className="row" style={{ marginBottom: 20 }}>
        <select
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
        >
          {services.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name} ({s.durationMins}m)
            </option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={search}>Search</button>
        <span style={{ marginLeft: 12 }}>
          <Link to="/dashboard" className="my-bookings-link">
          </Link>
        </span>
      </div>

      {loading && <p>Loading results...</p>}
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      {results && results.result.length === 0 && (
        <p className="muted">No available slots found for this date.</p>
      )}

      {results &&
        results.result.map((r) => (
          <div key={r.beauticianId} className="section">
            <h3>{r.beautician}</h3>
            <div className="chips">
              {r.available.length ? (
                r.available.map((t) => (
                  <button
                    key={t}
                    onClick={() => book(r.beauticianId, t)}
                    className="slot-btn"
                  >
                    {t}
                  </button>
                ))
              ) : (
                <span className="muted">No slots</span>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

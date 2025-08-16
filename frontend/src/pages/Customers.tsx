import { useState } from "react";
import type { Customer } from "../types";

type Props = {
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
};

export default function Customers({ customers, setCustomers }: Props) {
  const [formData, setFormData] = useState<Customer>({ name: "", email: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Customer = {
      ...formData,
      id: (globalThis.crypto && "randomUUID" in globalThis.crypto) ? crypto.randomUUID() : String(Date.now()),
    };
    setCustomers(prev => [...prev, newItem]);
    setFormData({ name: "", email: "" });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="card form">
        <input
          type="text"
          placeholder="Customer Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <button type="submit">Add Customer</button>
      </form>

      <div className="card">
        <ul className="profiles">
          {customers.map((c) => (
            <li key={c.id ?? c.email}>
              <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}`} alt="" />
              {c.name} <span>{c.email}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

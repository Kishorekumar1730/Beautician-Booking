import { useState } from "react";
import type { Service } from "../types";

type Props = {
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
};

export default function Services({ services, setServices }: Props) {
  const [formData, setFormData] = useState<{ name: string; price: string; durationMins: string }>({
    name: "",
    price: "",
    durationMins: "60",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Service = {
      _id: (globalThis.crypto && "randomUUID" in globalThis.crypto) ? crypto.randomUUID() : String(Date.now()),
      name: formData.name,
      price: Number(formData.price || 0),         // ✅ keep as number
      durationMins: Number(formData.durationMins || 60),
    };
    setServices(prev => [...prev, newItem]);
    setFormData({ name: "", price: "", durationMins: "60" });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="card form">
        <input
          type="text"
          placeholder="Service Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Duration (mins)"
          value={formData.durationMins}
          onChange={(e) => setFormData({ ...formData, durationMins: e.target.value })}
          required
        />
        <button type="submit">Add Service</button>
      </form>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Duration</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s._id ?? s.name}>
                <td>{s.name}</td>
                <td>{s.durationMins} mins</td>
                <td>${s.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

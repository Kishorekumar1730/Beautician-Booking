import { useState } from "react";
import type { StaffMember } from "../types";

type Props = {
  staff: StaffMember[];
  setStaff: React.Dispatch<React.SetStateAction<StaffMember[]>>;
};

export default function Staff({ staff, setStaff }: Props) {
  const [formData, setFormData] = useState<Pick<StaffMember, "name">>({ name: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: StaffMember = {
      id: (globalThis.crypto && "randomUUID" in globalThis.crypto) ? crypto.randomUUID() : String(Date.now()),
      name: formData.name,
    };
    setStaff(prev => [...prev, newItem]);
    setFormData({ name: "" });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="card form">
        <input
          type="text"
          placeholder="Staff Name"
          value={formData.name}
          onChange={(e) => setFormData({ name: e.target.value })}
          required
        />
        <button type="submit">Add Staff</button>
      </form>

      <div className="card">
        <ul className="staff">
          {staff.map((s) => (
            <li key={s.id ?? s.name}>
              <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(s.name)}`} alt="" />
              {s.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

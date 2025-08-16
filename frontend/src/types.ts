// src/types.ts
export type ID = string;

// Auth
export interface User {
  id: ID;
  username: string;
  email: string;
}
export interface AuthResponse {
  token: string;
  user: User;
}

// Core entities (IDs optional so client-side drafts compile)
export interface DashboardData {
  appointments: Booking[];
  customers: Customer[];
  services: Service[];
  staff: StaffMember[];
}

export interface Customer {
  id?: ID;
  name: string;
  email: string;
}

export interface StaffMember {
  id?: ID;
  name: string;
}

export interface Service {
  _id?: ID;
  name: string;
  durationMins: number;
  price: number; // keep as number everywhere
}

export interface Booking {
  _id?: ID;
  customer: string; // customer name (simple client-side shape)
  email: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  service: string; // service name (simple client-side shape)
  staff: string; // staff name
  status: "pending" | "confirmed" | "cancelled";
}

// Optional availability (only if you use it)
export interface AvailabilityRow {
  beauticianId: ID;
  beautician: string;
  available: string[];
}
export interface AvailabilityResponse {
  service: { id: ID; name: string; durationMins: number };
  date: string; // YYYY-MM-DD
  result: AvailabilityRow[];
}

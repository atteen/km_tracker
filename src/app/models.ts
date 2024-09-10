export interface Driver {
  id: string;
  username: string;
  email: string;
}

export interface Vehicle {
  id: string;
  name: string;
  license_plate: string;
  current_km: number;
}

export interface Trip {
  id: string;
  driver_id: string;
  vehicle_id: string;
  kilometers: number;
  trip_date: string;
}

export interface Job {
  id: string;
  name: string;
  client: string;
}

export interface Profile {
  username: string;
  navatar_urlame: string;
  website: string;
}

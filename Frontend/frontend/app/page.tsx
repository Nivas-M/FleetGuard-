"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Vehicle {
  id?: number | string;
  vehicle_id?: number | string;
  name?: string;
  plate_number?: string;
  model?: string;
  status?: string;
  [key: string]: unknown;
}

export default function Home() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchVehicles = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get("http://localhost:3000/api/admin/vehicles");

        if (isMounted) {
          const data = response?.data?.data ?? response?.data?.vehicles ?? [];
          setVehicles(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (isMounted) {
          setVehicles([]);
          setError("Unable to load vehicles right now. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchVehicles();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 p-6 text-zinc-900">
      <div className="mx-auto max-w-6xl rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Vehicles</h1>
            <p className="text-sm text-zinc-600">Managed fleet inventory</p>
          </div>
        </div>

        {loading ? (
          <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600">
            Loading vehicles...
          </div>
        ) : error ? (
          <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        ) : vehicles.length === 0 ? (
          <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600">
            No vehicles found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50 text-zinc-700">
                  <th className="px-4 py-3 font-medium">Vehicle</th>
                  <th className="px-4 py-3 font-medium">Plate</th>
                  <th className="px-4 py-3 font-medium">Model</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle, index) => {
                  const id = vehicle.id ?? vehicle.vehicle_id ?? index + 1;
                  const name = vehicle.name ?? `Vehicle ${id}`;
                  const plate = vehicle.plate_number ?? "-";
                  const model = vehicle.model ?? "-";
                  const status = vehicle.status ?? "Unknown";

                  return (
                    <tr key={String(id)} className="border-b border-zinc-200 last:border-b-0 hover:bg-zinc-50">
                      <td className="px-4 py-3">{name}</td>
                      <td className="px-4 py-3">{plate}</td>
                      <td className="px-4 py-3">{model}</td>
                      <td className="px-4 py-3">{status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

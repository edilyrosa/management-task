"use client"
import { useEffect, useState } from 'react';

export default function ClientesPage() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch('/api/clients') // La API debe estar en /app/api/clients/route.js
      .then((res) => res.json())
      .then((data) => setClients(data));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lista de Clientes</h1>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>{client.name} - {client.city}, {client.country}</li>
        ))}
      </ul>
    </div>
  );
}

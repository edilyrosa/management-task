/*
En Next.js App Router, el archivo /app/api/clients/route.js maneja todas las peticiones dirigidas 
a /api/clients.

GET: http://localhost:3000/api/clients → Obtiene todos los clientes.
POST: http://localhost:3000/api/clients → Crea un nuevo cliente.
Pero PUT y DELETE necesitan un id, por lo que la ruta cambia:

PUT: http://localhost:3000/api/clients/1 → Actualizar el cliente con id=1.
DELETE: http://localhost:3000/api/clients/1 → Eliminar el cliente con id=1.
🔹 Problema: route.js No Puede Capturar id Dinámico
El archivo /app/api/clients/route.js no puede manejar rutas con id dinámico (/api/clients/:id) 
porque Next.js no permite parámetros (params) en este archivo.

🔹 GET y POST → Se mantienen en /app/api/clients/route.js (porque no necesitan id).
🔹 PUT y DELETE → Se colocan en /app/api/clients/[id]/route.js, porque Next.js App Router 
necesita [id] en la carpeta para poder capturar el id.

📌 1️⃣ Estructura Final en Tu Proyecto
📂 app/
┣ 📂 api/
┃ ┣ 📂 clients/
┃ ┃ ┣ 📜 route.js (Maneja GET y POST para /api/clients)
┃ ┃ ┣ 📂 [id]/
┃ ┃ ┃ ┣ 📜 route.js (Maneja PUT y DELETE para /api/clients/:id)
*/


import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Conectar a PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// 🔹 PUT: Actualizar un cliente
export async function PUT(req, { params }) {
    try {
      const { id } = params;
      const body = await req.json();
      const { name, city, state, country, industry_codes, active } = body;
  
      const result = await pool.query(
        `UPDATE clients SET name=$1, city=$2, state=$3, country=$4, industry_codes=$5, active=$6 WHERE id=$7 RETURNING *`,
        [name, city, state, country, industry_codes, active, id]
      );
  
      return NextResponse.json(result.rows[0]); // 🔥 Devolver inmediatamente los datos actualizados
    } catch (error) {
      return NextResponse.json({ error: 'Error updating client' }, { status: 500 });
    }
  }

// 🔹 DELETE: Eliminar un cliente
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: 'Client ID is required' }, { status: 400 });
    }

    const result = await pool.query('DELETE FROM clients WHERE id=$1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Client deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error en DELETE:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

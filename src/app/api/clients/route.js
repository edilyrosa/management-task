// // import pool from '@/lib/db';

// // export async function GET() {
// //   try {
// //     const { rows } = await pool.query('SELECT * FROM clients');
// //     return Response.json(rows);
// //   } catch (error) {
// //     return Response.json({ error: error.message }, { status: 500 });
// //   }
// // }


// import pool from '../../../lib/db.js'; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas

// export async function GET() {
//   try {
//     console.log("Conectando a la base de datos...");
//     const { rows } = await pool.query('SELECT * FROM clients');
//     console.log("Consulta exitosa:", rows);
//     return Response.json(rows);
//   } catch (error) {
//     console.error("Error en la API de clientes:", error);
//     return Response.json({ error: error.message }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Conectar a PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// 🔹 GET: Obtener todos los clientes
export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM clients ORDER BY id DESC');
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('Error en GET:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 🔹 POST: Crear un nuevo cliente
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, city, state, country, industry_codes, active } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const result = await pool.query(
      `INSERT INTO clients (name, city, state, country, industry_codes, active) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, city, state, country, industry_codes, active]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error en POST:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

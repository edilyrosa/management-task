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

import { NextResponse } from 'next/server';
import { pool } from '../../../lib/db'; //Conexión a la base de datos

// 📌 GET: Obtener todos los proyectos
export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY id DESC');
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 📌 POST: Crear un nuevo proyecto
export async function POST(req) {
  try {
    const { client_id, name, description, active } = await req.json();
    const result = await pool.query(
      'INSERT INTO projects (client_id, name, description, active) VALUES ($1, $2, $3, $4) RETURNING *',
      [client_id, name, description, active]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { pool } from '../../../lib/db'; // Conexión a la base de datos

// 🔹 GET: Obtener todas las entradas de tareas
export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM taskentries ORDER BY date DESC');
    return NextResponse.json(result.rows, { status: 200 }); // result.rows para que la respuesta venga en formato Array
  } catch (error) {
    console.error('Error en GET:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { contractor_id, project_id, category_id, description, date, duration, billable } = await req.json();

    console.log('📥 Datos recibidos en API:', { contractor_id, project_id, category_id, description, date, duration, billable });

    if (!contractor_id || !project_id || !category_id || !description || !date || !duration) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    const result = await pool.query(
      `INSERT INTO taskentries (contractor_id, project_id, category_id, description, date, duration, billable)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [contractor_id, project_id, category_id, description, date, duration, billable]
    );

    console.log('✅ Registro insertado correctamente:', result.rows[0]);

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('❌ Error en la API (POST /taskentries):', error);
    return NextResponse.json({ 
      error: 'Error al crear la entrada de tarea', 
      details: error.message 
    }, { status: 500 });
  }
}

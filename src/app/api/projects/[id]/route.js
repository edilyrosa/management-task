import { NextResponse } from 'next/server';
import { pool } from '../../../../lib/db'; // Conexión a la base de datos

// 📌 PUT: Actualizar un proyecto
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { client_id, name, description, active } = await req.json();

    const result = await pool.query(
      'UPDATE projects SET client_id = $1, name = $2, description = $3, active = $4 WHERE id = $5 RETURNING *',
      [client_id, name, description, active, id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 📌 DELETE: Eliminar un proyecto
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Project deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

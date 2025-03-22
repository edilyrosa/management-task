import { NextResponse } from 'next/server';
import { pool } from '../../../../lib/db'; // Asegúrate de tener la conexión a la base de datos

// 📌 ACTUALIZAR UNA ENTRADA DE TAREA (PUT)
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { contractor_id, project_id, category_id, description, date, duration, billable } = await req.json();

    // Validamos que los campos requeridos estén presentes
    if (!contractor_id || !project_id || !category_id || !description || !date || !duration) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await pool.query(
      `UPDATE taskentries 
       SET contractor_id=$1, project_id=$2, category_id=$3, 
           description=$4, date=$5, duration=$6, billable=$7
       WHERE id=$8 RETURNING *`,
      [contractor_id, project_id, category_id, description, date, duration, billable, id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Task entry not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating task entry:', error);
    return NextResponse.json({ error: 'Error updating task entry' }, { status: 500 });
  }
}

// 📌 ELIMINAR UNA ENTRADA DE TAREA (DELETE)
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    const result = await pool.query('DELETE FROM taskentries WHERE id=$1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Task entry not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Task entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting task entry:', error);
    return NextResponse.json({ error: 'Error deleting task entry' }, { status: 500 });
  }
}



//ahora este es el codigo de como quedo mi TaskEntryTable, necesito que agreges billable con yes (verde) not (rojo) con el smismo estilo con el que lo hacias con status active o inactive en con color y background
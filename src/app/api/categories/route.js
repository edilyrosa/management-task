import { NextResponse } from 'next/server';
import { pool } from '../../../lib/db';//Conexión a la base de datos
export async function GET() {
  try {
    const categories = await pool.query('SELECT * FROM categories');
    return NextResponse.json(categories.rows, {status:200});
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { pool } from '../../../lib/db';//Conexión a la base de datos

export async function GET() {
  try {
    const contractors = await pool.query('SELECT * FROM contractors');
    return NextResponse.json(contractors.rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching contractors:', error);
    return NextResponse.json({ error: 'Failed to fetch contractors' }, { status: 500 });
  }
}

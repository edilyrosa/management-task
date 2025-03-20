// import pool from '@/lib/db';

// export async function GET() {
//   try {
//     const { rows } = await pool.query('SELECT * FROM clients');
//     return Response.json(rows);
//   } catch (error) {
//     return Response.json({ error: error.message }, { status: 500 });
//   }
// }


import pool from '@/lib/db';

export async function GET() {
  try {
    console.log("Conectando a la base de datos...");
    const { rows } = await pool.query('SELECT * FROM clients');
    console.log("Consulta exitosa:", rows);
    return Response.json(rows);
  } catch (error) {
    console.error("Error en la API de clientes:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// import { Pool } from 'pg';
// import dotenv from 'dotenv';

// dotenv.config();

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false, // Necesario para Neon
//   },
// });

// export default pool;


// import { Pool } from 'pg';

// // Cargar variables solo en desarrollo (evita errores en Vercel)
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
// }

// console.log("DATABASE_URL en producción:", process.env.DATABASE_URL); // 🔍 Verifica que se carga bien

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false, // 🔥 Necesario para Neon y Vercel
//   },
// });

// export default pool;


import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Usa la variable de entorno de NeonDB
  ssl: { rejectUnauthorized: false }, // 🔥 IMPORTANTE para que Neon acepte la conexión
});

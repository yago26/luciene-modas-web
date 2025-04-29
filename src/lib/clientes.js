import db from "./db";

export async function getClientes() {
  const result = await db.query("SELECT * FROM tb_cliente");
  return result.rows; /* tuplas retornadas */
}

// Comunicações lentas precisam ser assíncronas
// async function() { await ... "Espere esse resultado" }

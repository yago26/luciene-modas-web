import db from "@/lib/db";

export default async () => {
  const clientes = await db.query("select * from tb_cliente");
  return (
    <>
      <h1>Clientes</h1>
      <ol>
        {clientes.rows.map((c) => (
          <li key={c.id}>
            O cliente `{c.nome}` mora em `{c.endereco}` e tem o contato `
            {c.contato}`
          </li>
        ))}
      </ol>
      <a href="../">Voltar</a>
    </>
  );
};

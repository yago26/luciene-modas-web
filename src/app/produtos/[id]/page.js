import db from "@/lib/db";

export default async ({ params }) => {
  const PRODUTOS = await db.query(
    `select * from tb_produto where id = ${params.id}`
  );
  // É um array de elemento único
  return (
    <>
      <img src={PRODUTOS.rows[0].url} alt={PRODUTOS.rows[0].sobre} />
      <h2>{PRODUTOS.rows[0].nome}</h2>
      <p>{PRODUTOS.rows[0].sobre}</p>
      <p>{PRODUTOS.rows[0].valor}</p>
      <a href="../">Voltar</a>
    </>
  );
};

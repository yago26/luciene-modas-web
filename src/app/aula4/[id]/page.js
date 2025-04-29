/* */
import db from "@/lib/db";

export default async ({ params }) => {
  const tb_produto = await db.query(
    "select * from tb_produto where id =" + params.id
  );
  /* O id de params.id veio do nome da rota */
  return (
    <>
      <h1>{tb_produto.rows[0].nome}</h1>
      <img src={tb_produto.rows[0].url} />
      <p>Preço: {tb_produto.rows[0].preco}</p>
    </>
  );
};

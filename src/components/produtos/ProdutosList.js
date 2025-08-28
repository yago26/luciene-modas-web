import style from "@/components/produtos/produtosList.module.css";

import CardProduto from "@/components/produtos/CardProduto";
import getConsumidor from "@/lib/getConsumidor";

export default async function ProdutosList() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/produtos`
  );
  const produtos = await response.json();

  const consumidor = await getConsumidor();

  return (
    <>
      <article>
        <h2>Produtos Disponíveis</h2>
        <div className={style.produtosPaginaInicial}>
          {produtos.map((produto) => {
            return (
              <CardProduto
                key={produto.id}
                produto={produto}
                consumidor={consumidor}
              />
            );
          })}
        </div>
      </article>

      <article className={style.produtosEmPromocao}>
        <h2>Em Promoção</h2>
        <div className={style.produtosPaginaInicial}></div>
      </article>

      <article className={style.produtosMaisVendidos}>
        <h2>Mais Vendidos</h2>
        <div className={style.produtosPaginaInicial}></div>
      </article>
    </>
  );
}

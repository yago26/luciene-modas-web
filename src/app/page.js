import db from "@/lib/db";
import { fakeProducts } from "@/lib/fakeDataBase";
import NavBar from "@/components/NavBar";
import Product from "@/components/Product";
import style from "./page.module.css";

export default async function Home() {
  // const produtos = db.query("select * from tb_produto");
  return (
    <>
      <NavBar />

      {/*{produtos.rows.map((produto) => {
        return (
          <Product
            key={produto.id}
            id={produto.id}
            nome={produto.nome}
            sobre={produto.sobre}
            valor={produto.valor}
            url={produto.url}
          />
        );
      })}*/}

      <article className={`produtosPaginaInicial produtosEmPromocao`}>
        <h2>Em Promoção</h2>
        {fakeProducts.map((produto) => {
          return (
            <Product
              key={produto.id}
              id={produto.id}
              nome={produto.nome}
              sobre={produto.sobre}
              valor={produto.valor}
              url={produto.url}
            />
          );
        })}
      </article>

      <article className={`produtosPaginaInicial produtosMaisVendidos`}>
        <h2>Mais Vendidos</h2>
        {fakeProducts.map((produto) => {
          return (
            <Product
              key={produto.id}
              id={produto.id}
              nome={produto.nome}
              sobre={produto.sobre}
              valor={produto.valor}
              url={produto.url}
            />
          );
        })}
      </article>
    </>
  );
}

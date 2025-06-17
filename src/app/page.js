import db from "@/lib/db";
import { fakeProducts } from "@/lib/fakeDataBase";
import Gerenciamento from "@/components/Gerenciamento";
import NavBar from "@/components/NavBar";
import Product from "@/components/Product";
import style from "./page.module.css";
import "./globals.css";

export default async function Home() {
  // const produtos = db.query("select * from tb_produto");
  return (
    <>
      <NavBar />
      <Gerenciamento />

      <div className={style.conteudo}>
        <article className={style.produtosEmPromocao}>
          <h2>Em Promoção</h2>
          <div className={style.produtosPaginaInicial}>
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
          </div>
        </article>

        <article className={style.produtosMaisVendidos}>
          <h2>Mais Vendidos</h2>
          <div className={style.produtosPaginaInicial}>
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
          </div>
        </article>
      </div>

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
    </>
  );
}

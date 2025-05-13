import style from "./page.module.css";
import Produto from "@/components/Produto";
import Link from "next/link";
import Image from "next/image";
import db from "@/lib/db";

/* Tem caminhos vazios */

export default async function Home() {
  const PRODUTOS = await db.query("select * from tb_produto");
  console.log(PRODUTOS);
  return (
    <div className={style.content}>
      <article>
        <img src="" alt="" />
      </article>

      <section className={style.categorias}>
        <div className={style.categoria}>
          <Link href="">
            <Image src="" alt="Categoria masculina" />
            <h2>Masculino</h2>
          </Link>
        </div>
        <div className={style.categoria}>
          <Link href="">
            <Image src="" alt="Categoria feminina" />
            <h2>Feminino</h2>
          </Link>
        </div>
        <div className={style.categoria}>
          <Link href="">
            <Image src="" alt="Categoria infatil" />
            <h2>Infantil</h2>
          </Link>
        </div>
        <div className={style.categoria}>
          <Link href="">
            <Image src="" alt="Categoria cosméticos" />
            <h2>Cosméticos</h2>
          </Link>
        </div>
      </section>

      <article className={style.produtos}>
        {PRODUTOS.rows.map((produto) => {
          return (
            <Produto
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

      <div>
        <h1>Bem-vindo(a)!</h1>
        <p>Esta é a tela inicial</p>
        <ol className={style.listaDeRotas}>
          <li>
            <a href="./aula1">Criando Primeira Rota</a>
          </li>
          <li>
            <a href="./aula2">Estilizando Rotas</a>
          </li>
          <li>
            <a href="./aula3/usuario">
              Rota dentro de Rota e Conexão do Banco de Dados
            </a>
          </li>
          <li>
            <a href="./aula4">
              Utilizando tabelas a partir da Conexão com o Banco de Dados
            </a>
          </li>
        </ol>
      </div>
    </div>
  );
}

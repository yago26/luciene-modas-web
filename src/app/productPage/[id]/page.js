import db from "@/lib/db";
import { fakeProducts } from "@/lib/fakeDataBase";
import NavBar from "@/components/geral/NavBar";
import Link from "next/link";

export default async function ProductPage({ params }) {
  // let produto = db.query(`select * from tb_produto where ${indice} = id`);
  let produto;
  let indice = params.id;
  for (let p of fakeProducts) {
    if (p.id == indice) {
      produto = p;
      break;
    }
  }

  return (
    <>
      <NavBar />
      <main>
        <h1>{produto.nome}</h1>
        <hr />
        <img
          src={produto.url}
          alt={produto.sobre}
          width={500}
          height={500}
          style={{ objectFit: "cover" }}
        />
        <p>{produto.sobre}</p>
        <p>{produto.valor}</p>
        <p>{produto.tamanho}</p>
        <p>{produto.estoque}</p>
        <button>Comprar</button>
      </main>
    </>
  );
}

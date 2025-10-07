import { cookies } from "next/headers";
// import { verificarToken } from "@/lib/auth";

import { fakeProducts } from "@/lib/fakeDataBase";

import NavBar from "@/components/layout/NavBar";
import Product from "@/components/produtos/CardProduto";

import Link from "next/link";

export default ({ params }) => {
  const cookie = cookies().toString();
  const usuario = verificarToken(cookie);
  let genero = usuario ? usuario.genero : null;

  return (
    <>
      <NavBar />
      <h1>
        <Link href="/">Início</Link> {">"} {params.nome}
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-around",
          gap: "0.01%",
        }}
      >
        {fakeProducts
          .filter((produto) => {
            if (usuario) {
              if (
                (produto.genero === genero || produto.genero === null) &&
                produto.categoria === params.nome
              ) {
                return produto;
              }
            } else {
              if (
                produto.categoria === params.nome ||
                produto.genero === params.nome
              ) {
                return produto;
              }
            }
          })
          .map((produto) => {
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
    </>
  );
};

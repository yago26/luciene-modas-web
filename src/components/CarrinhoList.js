"use client";

import Link from "next/link";
import { useCarrinhoStore } from "@/app/store/carrinho";

export default ({ usuario }) => {
  const { produtos, adicionarProduto, removerProduto } = useCarrinhoStore();

  const genero = usuario.genero;
  return (
    <>
      <div>
        <h2>
          Bem vind
          {genero === "Masculino" ? "o" : genero === "Feminino" ? "a" : "(o)a"}!
        </h2>
        <h2>Esse é o seu Carrinho de Compras</h2>
        {produtos.map((p) => (
          <div key={p.id}>
            <Link href={`/productPage/${p.id}`}>
              <img src={p.url} alt={p.sobre} width={100} height={100} />
              <div>
                <h4>{p.nome}</h4>
                <p>{p.sobre}</p>
                <p>{p.valor}</p>
              </div>
            </Link>
            <div>
              <button
                onClick={() => {
                  adicionarProduto(p);
                }}
              >
                +
              </button>
              <span>{p.quantidade}</span>
              <button
                onClick={() => {
                  removerProduto(p);
                }}
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

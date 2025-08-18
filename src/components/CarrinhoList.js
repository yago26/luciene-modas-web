"use client";

import Link from "next/link";
import { useCarrinhoStore } from "@/app/store/carrinho";
import style from "./carrinhoList.module.css";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function CarrinhoList({ usuario }) {
  const [selecionados, setSelecionados] = useState([]);
  const { produtos, adicionarProduto, removerProduto } = useCarrinhoStore();

  if (!usuario) {
    redirect("/login");
  }

  // import { cookies } from "next/headers";
  //   import { verificarToken } from "@/lib/auth";

  //   const cookie = cookies().toString();
  //   const usuario = verificarToken(cookie);

  //   if (!usuario) {
  //     router.push("/login");
  //     router.refresh();
  //     return;
  //   }

  const genero = usuario.genero;
  return (
    <>
      <div>
        <h1>
          Bem vind
          {genero === "Masculino" ? "o" : genero === "Feminino" ? "a" : "(o)a"}!
        </h1>
        <h2>Esse é o seu Carrinho de Compras</h2>
        <hr />
        {produtos.map((p) => (
          <div key={p.id} className={style.containerProduto}>
            <Link
              href={`/productPage/${p.id}`}
              className={style.containerLinkProduto}
            >
              <img src={p.url} alt={p.sobre} width={100} height={100} />
              <div>
                <h3>{p.nome}</h3>
                <p>{p.sobre}</p>
                <p>{p.valor}</p>
              </div>
            </Link>
            <div className={style.containerQuantidadeProduto}>
              <button
                className={style.btn}
                onClick={() => {
                  adicionarProduto(p);
                }}
              >
                +
              </button>
              <span>{p.quantidade}</span>
              <button
                className={style.btn}
                onClick={() => {
                  if (p.quantidade <= 1) {
                    setSelecionados(
                      selecionados.filter((produto) => p.id != produto.id)
                    );
                  }
                  removerProduto(p);
                }}
              >
                -
              </button>
            </div>
            <div className={style.containerSelecaoProduto}>
              <input
                id={p.id}
                name={p.id}
                className={style.checkbox}
                type="checkbox"
                onChange={(e) => {
                  if (selecionados.find((produto) => p.id === produto.id)) {
                    setSelecionados(
                      selecionados.filter((produto) => p.id !== produto.id)
                    );
                    return;
                  }
                  setSelecionados([...selecionados, p]);
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className={style.containerFinalizarCompra}>
        <button
          onClick={() => {
            console.log(selecionados);
            if (selecionados.length <= 0) {
              alert("Erro! Nenhum produto selecionado.");
              return;
            }
            router.push(`./checkout/${selecionados}`);
            router.refresh();
          }}
        >
          Finalizar compra
        </button>
      </div>
      <div>
        <h3>Selecionados</h3>
        {selecionados.map((p) => (
          <div key={p.id}>
            <p>{p.nome}</p>
          </div>
        ))}
      </div>
    </>
  );
}

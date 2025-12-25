"use client";

import { useCarrinhoStore } from "@/app/store/carrinho";
import MenuHamburguer from "./MenuHamburguer";

import { CircleUserRound, Package, ShoppingCart } from "lucide-react";

import Link from "next/link";
import { useEffect, useState } from "react";

import style from "./navBarFuncionalidades.module.css";

export default ({ usuario }) => {
  const { itens, fetchItensCarrinho, getSize } = useCarrinhoStore();
  const [quantidadeItensCarrinho, setQuantidadeItensCarrinho] = useState(
    getSize()
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        await fetchItensCarrinho();
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    if (usuario) {
      carregar();
    }
  }, []);

  useEffect(() => {
    setQuantidadeItensCarrinho(getSize());
  }, [itens]);

  return (
    <div>
      {usuario && (
        <div id={style.funcionalidadesAutenticadas}>
          <Link href="/meus-pedidos">
            <Package className={style.icone} />
          </Link>

          <div className={style.carrinho}>
            <Link href="/carrinho">
              <ShoppingCart className={style.icone} />
            </Link>
            {!loading && quantidadeItensCarrinho > 0 && (
              <span className={style.quantidadeItensCarrinho}>
                {quantidadeItensCarrinho}
              </span>
            )}
          </div>

          <Link href="/perfil">
            <CircleUserRound className={style.icone} />
          </Link>

          <MenuHamburguer />
        </div>
      )}

      {!usuario && (
        <div id={style.funcionalidadesNaoAutenticadas}>
          <Link href="/login">
            <button className={style.login}>Login</button>
          </Link>
          <Link href="/sign-up">
            <button className={style.signUp}>Sign Up</button>
          </Link>
        </div>
      )}
    </div>
  );
};

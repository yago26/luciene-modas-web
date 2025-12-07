import Link from "next/link";
import Image from "next/image";

import SearchBar from "./SearchBar";

import style from "./navbar.module.css";
import { CircleUserRound, Menu, Package, ShoppingCart } from "lucide-react";
import getUsuarioServerSide from "@/lib/getUsuarioServerSide";
import MenuHamburguer from "./MenuHamburguer";

export default async function NavBar() {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/produtos-disponiveis`
  );
  const produtos = await response.json();

  const usuario = await getUsuarioServerSide();

  return (
    <>
      <header className={style.header}>
        <nav>
          <div className={style.barraFuncionalidades}>
            <Link href="/">
              <Image
                src="/favicon/fundo-vinho/android-chrome-192x192.png"
                alt="Logo marca Luciene Modas - Roupas e Cosméticos"
                width={60}
                height={60}
              />
            </Link>

            <SearchBar produtos={produtos} />

            <div>
              {usuario && (
                <div id={style.funcionalidadesAutenticadas}>
                  <Link href="/meus-pedidos">
                    <Package className={style.icone} />
                  </Link>

                  <Link href="/carrinho">
                    <ShoppingCart className={style.icone} />
                  </Link>

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
          </div>

          <ul className={style.linksRapidosCategorias}>
            <Link href="/categorias/roupas">
              <li>Roupas</li>
            </Link>

            <Link href="/categorias/cosmeticos">
              <li>Cosméticos</li>
            </Link>

            <Link href="/categorias/masculino">
              <li>Masculino</li>
            </Link>

            <Link href="/categorias/feminino">
              <li>Feminino</li>
            </Link>

            <Link href="/categorias/infantil">
              <li>Infantil</li>
            </Link>

            <Link href="/categorias/outros">
              <li>Outros</li>
            </Link>
          </ul>
        </nav>
      </header>
    </>
  );
}

import Link from "next/link";
import Image from "next/image";

import SearchBar from "./SearchBar";

import style from "./navbar.module.css";
import { CircleUserRound, Package, ShoppingCart } from "lucide-react";
import getUsuarioServerSide from "@/lib/getUsuarioServerSide";
import MenuHamburguer from "./MenuHamburguer";
import NavBarCategoriasList from "./NavBarCategoriasList";

export default async function NavBar() {
  const usuario = await getUsuarioServerSide();

  return (
    <>
      <nav className={style.navBar}>
        <div className={style.barraFuncionalidades}>
          <Link href="/">
            <Image
              src="/favicon/fundo-vinho/android-chrome-192x192.png"
              alt="Logo marca Luciene Modas - Roupas e Cosméticos"
              width={60}
              height={60}
            />
          </Link>

          <SearchBar />

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

        <NavBarCategoriasList />
      </nav>
    </>
  );
}

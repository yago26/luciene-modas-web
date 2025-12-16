import getUsuarioServerSide from "@/lib/getUsuarioServerSide";
import NavBarCategoriasList from "./NavBarCategoriasList";
import SearchBar from "./SearchBar";
import NavBarFuncionalidades from "./NavBarFuncionalidades";

import Link from "next/link";
import Image from "next/image";

import style from "./navbar.module.css";

export default async function NavBar() {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL || ""}/api/produtos?estoque=disponivel`
  );
  const produtos = await response.json();

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

          <SearchBar produtos={produtos} />

          <NavBarFuncionalidades usuario={usuario} />
        </div>

        <NavBarCategoriasList />
      </nav>
    </>
  );
}

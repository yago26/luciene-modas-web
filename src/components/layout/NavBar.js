import Link from "next/link";
import Image from "next/image";

import SearchBar from "./SearchBar";

import style from "./navbar.module.css";
import { CircleUserRound, ShoppingCart } from "lucide-react";
import getUsuarioServerSide from "@/lib/getUsuarioServerSide";

export default async function NavBar() {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/produtos`);
  const produtos = await response.json();

  const consumidor = await getUsuarioServerSide();

  return (
    <>
      <header className={style.header}>
        <nav>
          <div className={style.barraFuncionalidades}>
            <Link href="/">
              <Image
                src="/favicon/fundo-branco/android-chrome-192x192.png"
                alt="Logo marca Luciene Modas - Roupas e Cosméticos"
                width={60}
                height={60}
              />
            </Link>

            <SearchBar produtos={produtos} />

            <div>
              {consumidor && (
                <div id={style.funcionalidadesAutenticadas}>
                  <Link href="/shopCar">
                    <ShoppingCart size={30} color="black" />
                  </Link>
                  <Link href="/profile">
                    <CircleUserRound size={30} color="black" />
                  </Link>
                </div>
              )}

              {!consumidor && (
                <div id={style.funcionalidadesNaoAutenticadas}>
                  <Link href="/login">
                    <button className={style.signIn}>Login</button>
                  </Link>
                  <Link href="/signUp">
                    <button className={style.signUp}>Sign Up</button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <ul className={style.linksRapidosCategorias}>
            <Link href="/categories/roupas">
              <li>Roupas</li>
            </Link>

            <Link href="/categories/cosmeticos">
              <li>Cosméticos</li>
            </Link>

            <Link href="/categories/masculino">
              <li>Masculino</li>
            </Link>

            <Link href="/categories/feminino">
              <li>Feminino</li>
            </Link>

            <Link href="/categories/infantil">
              <li>Infantil</li>
            </Link>

            <Link href="/categories/outros">
              <li>Outros</li>
            </Link>
          </ul>
        </nav>
      </header>
    </>
  );
}

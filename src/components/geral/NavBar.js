import { cookies } from "next/headers";
import { verificarToken } from "@/lib/auth";

import Link from "next/link";
import Image from "next/image";

import SearchBar from "./SearchBar";
import DivEspacamento from "./DivEspacamento";

import style from "./navbar.module.css";
import { CircleUserRound, ShoppingCart } from "lucide-react";

export default function NavBar() {
  const cookie = cookies().toString();
  const usuario = verificarToken(cookie);

  return (
    <>
      <header className={style.header}>
        <nav>
          <div className={style.barraFuncionalidades}>
            <Link href="/">
              <Image
                src="/favicon/android-chrome-192x192.png"
                alt="Logo marca Luciene Modas - Roupas e Cosméticos"
                width={48}
                height={48}
              />
            </Link>

            {/* <ul className={style.linksRapidos}>
              <Link href="/">
                <li>Início</li>
              </Link>
              <Link href="/">
                <li>Sobre</li>
              </Link>
              <Link href="/">
                <li>Contatos</li>
              </Link>
            </ul> */}

            <SearchBar />

            <div>
              {usuario && (
                <div id={style.funcionalidadesAutenticadas}>
                  <Link href="/shopCar">
                    <ShoppingCart size={30} color="black" />
                  </Link>
                  <Link href="/profile">
                    <CircleUserRound size={30} color="black" />
                  </Link>
                </div>
              )}

              {!usuario && (
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
            <li>
              <Link href="/">Roupas</Link>
            </li>
            <li>
              <Link href="/">Cosméticos</Link>
            </li>
            <li>
              <Link href="/">Masculino</Link>
            </li>
            <li>
              <Link href="/">Feminino</Link>
            </li>
            <li>
              <Link href="/">Infantil</Link>
            </li>
            <li>
              <Link href="/">Outros</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

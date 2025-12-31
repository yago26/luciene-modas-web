"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import style from "./categoriasList.module.css";

export default () => {
  const pathname = usePathname();

  return (
    <ul className={style.linksRapidosCategorias}>
      <li className={pathname == "/categorias/roupas" ? style.ativo : ""}>
        <Link href="/categorias/roupas">Roupas</Link>
      </li>

      <li className={pathname == "/categorias/cosmeticos" ? style.ativo : ""}>
        <Link href="/categorias/cosmeticos">Cosméticos</Link>
      </li>

      <li className={pathname == "/categorias/masculino" ? style.ativo : ""}>
        <Link href="/categorias/masculino">Masculino</Link>
      </li>

      <li className={pathname == "/categorias/feminino" ? style.ativo : ""}>
        <Link href="/categorias/feminino">Feminino</Link>
      </li>

      <li className={pathname == "/categorias/infantil" ? style.ativo : ""}>
        <Link href="/categorias/infantil">Infantil</Link>
      </li>

      <li className={pathname == "/categorias/outros" ? style.ativo : ""}>
        <Link href="/categorias/outros">Outros</Link>
      </li>
    </ul>
  );
};

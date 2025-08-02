"use client";

import style from "./informacoesUsuario.module.css";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function InformacoesUsuario({ usuario }) {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/logout"); // Limpa o cookie
    router.push("/"); // Redireciona para home
    router.refresh(); // Força reload do server-side para atualizar NavBar
  };

  return (
    <>
      <h1>Perfil do Usuário</h1>
      <hr />
      <ul className={style.listaInformacoesUsuario}>
        <li className={style.informacaoUsuario}>
          <label htmlFor="">Nome</label>
          <input id="" type="text" value={usuario.nome} />
        </li>
        <li className={style.informacaoUsuario}>
          <label htmlFor="">Email</label>
          <input id="" type="text" value={usuario.email} />
        </li>
        <li className={style.informacaoUsuario}>
          <label htmlFor="">CEP</label>
          <input id="" type="text" value={usuario.cep} />
        </li>
        <li className={style.informacaoUsuario}>
          <label htmlFor="">Gênero</label>
          <input id="" type="text" value={usuario.genero} />
        </li>
      </ul>
      <hr />
      <button className={style.btnLogout} onClick={logout}>
        Logout
      </button>
    </>
  );
}

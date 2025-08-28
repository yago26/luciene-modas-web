"use client";

import style from "./informacoesUsuario.module.css";

import { useRouter } from "next/navigation";

export default function InformacoesUsuario({ usuario }) {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/logout"); // Limpa o cookie
    router.push("/"); // Redireciona para home
    router.refresh(); // Força reload do server-side para atualizar NavBar
  };
  
  const excluirConta = async () => {
    await fetch("/api/logout"); // Limpa o cookie
    await fetch(`/api/consumidores/${usuario.id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" }
    })
    router.push("/"); // Redireciona para home
    router.refresh(); // Força reload do server-side para atualizar NavBar
  }

  return (
    <>
      <h1>Perfil do Usuário</h1>
      <hr />
      <ul className={style.listaInformacoesUsuario}>
        <li className={style.informacaoUsuario}>
          <label htmlFor="">Nome</label>
          {usuario.nome}
        </li>
        <li className={style.informacaoUsuario}>
          <label htmlFor="">Email</label>
          {usuario.email}
        </li>
        <li className={style.informacaoUsuario}>
          <label htmlFor="">CEP</label>
          {usuario.cep}
        </li>
        <li className={style.informacaoUsuario}>
          <label htmlFor="">Gênero</label>
          {usuario.genero}
        </li>
      </ul>
      <hr />
      <button className={style.btnLogout} onClick={logout}>
        Logout
      </button>
      <button className={style.btnLogout} onClick={excluirConta}>
        Excluir conta
      </button>
    </>
  );
}

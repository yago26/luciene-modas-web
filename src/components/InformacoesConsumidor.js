"use client";

import { signOut } from "next-auth/react";
import style from "./informacoesConsumidor.module.css";

import { useRouter } from "next/navigation";

export default function Informacoesconsumidor({ consumidor }) {
  console.log("Informações do consumidor recebidas:", consumidor);
  const router = useRouter();

  const logout = async () => {
    await signOut({ redirect: false }); // Limpa o cookie
    router.push("/"); // Redireciona para home
    router.refresh(); // Força reload do server-side para atualizar NavBar
  };

  const excluirConta = async () => {
    await signOut({ redirect: false }); // Limpa o cookie
    await fetch(`/api/consumidores/${consumidor.id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    });
    router.push("/"); // Redireciona para home
    router.refresh(); // Força reload do server-side para atualizar NavBar
  };

  return (
    <>
      <h1>Perfil do Usuário</h1>
      <hr />
      <ul className={style.listaInformacoesConsumidor}>
        <li className={style.informacaoConsumidor}>
          <label htmlFor="">Nome</label>
          {consumidor.nome}
        </li>
        <li className={style.informacaoConsumidor}>
          <label htmlFor="">Email</label>
          {consumidor.email}
        </li>
        <li className={style.informacaoConsumidor}>
          <label htmlFor="">CEP</label>
          {consumidor.cep}
        </li>
        <li className={style.informacaoConsumidor}>
          <label htmlFor="">Gênero</label>
          {consumidor.genero}
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

"use client";

import { signOut } from "next-auth/react";
import style from "./informacoesConsumidor.module.css";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Informacoesconsumidor({ consumidor }) {
  const [form, setForm] = useState({
    nome: consumidor.nome,
    cep: consumidor.cep,
    genero: consumidor.genero,
  });
  const router = useRouter();

  const salvar = () => {
    // fazer depois
  };

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
          <input
            type="text"
            placeholder="Nome"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
        </li>
        <li className={style.informacaoConsumidor}>
          <label htmlFor="">Email</label>
          {consumidor.email}
        </li>
        <li className={style.informacaoConsumidor}>
          <label htmlFor="">CEP</label>
          <input
            type="text"
            placeholder="Nome"
            value={form.cep}
            onChange={(e) => setForm({ ...form, cep: e.target.value })}
          />
          {consumidor.cep}
        </li>
        <li className={style.informacaoConsumidor}>
          <label htmlFor="">Gênero</label>
          <input
            type="radio"
            placeholder="Nome"
            value={form.genero}
            onChange={(e) => setForm({ ...form, genero: e.target.value })}
          />
          {consumidor.genero}
        </li>
      </ul>
      <button className={style.btn} onClick={salvar}>
        Salvar
      </button>
      <hr />
      <button className={style.btn} onClick={logout}>
        Logout
      </button>
      <button className={style.btn} onClick={excluirConta}>
        Excluir conta
      </button>
    </>
  );
}

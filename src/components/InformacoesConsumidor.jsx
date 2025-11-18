"use client";

import { signOut } from "next-auth/react";
import style from "./informacoesConsumidor.module.css";

import { useState } from "react";
import { Divider } from "antd";

export default function Informacoesconsumidor({ consumidor }) {
  const [form, setForm] = useState({
    nome: consumidor.nome,
    cep: consumidor.cep,
    genero: consumidor.genero,
  });

  const salvar = async () => {
    const cepLimpo = form.cep.replace(/\D/g, "");

    if (!form.nome || !cepLimpo || !form.genero) {
      console.log("Campos inválidos.");
      return alert(
        "Erro! Campos inválidos." +
          "\n" +
          "Preencha todos os campos com valores antes de atualizar seu perfil."
      );
    }

    const response = await fetch(`/api/consumidores/${consumidor.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: form.nome,
        genero: form.genero,
        cep: cepLimpo,
      }),
    });

    if (response.ok) {
      return alert("Sucesso! Dados de perfil atualizados com êxito.");
    }
  };

  const logout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" }); // Limpa o cookie
  };

  const excluirConta = async () => {
    await signOut({ redirect: true, callbackUrl: "/" }); // Limpa o cookie
    await fetch(`/api/consumidores/${consumidor.id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    });
  };

  return (
    <>
      <div>
        <ul className={style.listaInformacoesConsumidor}>
          <li className={style.informacaoConsumidor}>
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              placeholder="Nome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              maxLength={255}
            />
          </li>
          <li className={style.informacaoConsumidor}>
            <label>Email</label>
            <input disabled value={consumidor.email} />
          </li>
          <li className={style.informacaoConsumidor}>
            <label htmlFor="cep">CEP</label>
            <input
              id="cep"
              type="text"
              placeholder="12345-678"
              value={form.cep.replace(/(\d{5})(\d{1,3})/, "$1-$2")}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, ""); // remove tudo que não é número
                if (value.length > 8) value = value.slice(0, 8); // limita a 8 dígitos
                // Aplica a formatação do CEP automaticamente
                if (value.length > 5) {
                  value = value.replace(/(\d{5})(\d{1,3})/, "$1-$2");
                }
                setForm({ ...form, cep: value });
              }}
              maxLength={9}
            />
          </li>
          <li className={style.informacaoConsumidor}>
            <label>Gênero</label>
            <input readOnly value={form.genero} />
            <label htmlFor="masculino">
              <input
                className="campoEntradaGeneroMasculino"
                type="radio"
                name="genero"
                id="masculino"
                value="Masculino"
                checked={form.genero === "Masculino"}
                onChange={(e) => setForm({ ...form, genero: e.target.value })}
              />
              Masculino
            </label>
            <label htmlFor="feminino">
              <input
                className="campoEntradaGeneroFeminino"
                type="radio"
                name="genero"
                id="feminino"
                value="Feminino"
                checked={form.genero === "Feminino"}
                onChange={(e) => setForm({ ...form, genero: e.target.value })}
              />
              Feminino
            </label>
            <label htmlFor="semIdentificacao">
              <input
                className="campoEntradaGeneroSemIdentificacao"
                type="radio"
                name="genero"
                id="semIdentificacao"
                value="Outro"
                checked={form.genero === "Outro"}
                onChange={(e) => setForm({ ...form, genero: e.target.value })}
                required
              />
              Prefiro não informar
            </label>
          </li>
        </ul>
        <Divider style={{ borderColor: "black" }} />
      </div>

      <div className={style.containerBtn}>
        <button className={style.btnSalvar} onClick={salvar}>
          Salvar
        </button>
        <div>
          <button onClick={logout}>Logout</button>
          <button onClick={excluirConta}>Excluir conta</button>
        </div>
      </div>
    </>
  );
}

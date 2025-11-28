"use client";

import { signOut } from "next-auth/react";
import style from "./infoUsuario.module.css";

import { useState } from "react";
import { Button, Modal, Divider } from "antd";
import Sucesso from "./toasts/Sucesso";
import Aviso from "./toasts/Aviso";

export default function infoUsuario({ usuario }) {
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [keySuccess, setKeySuccess] = useState(0);
  const [showAlertWarning, setShowAlertWarning] = useState(false);
  const [keyWarning, setKeyWarning] = useState(0);

  const [form, setForm] = useState({
    nome: usuario.nome,
    cep: usuario.cep,
    genero: usuario.genero,
  });

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const salvar = async () => {
    const cepLimpo = form.cep.replace(/\D/g, "");

    if (!form.nome || !cepLimpo || !form.genero) {
      setShowAlertWarning(true);
      setKeyWarning((prev) => prev + 1);
      return;
    }

    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/usuarios/${usuario.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: form.nome,
          genero: form.genero,
          cep: cepLimpo,
        }),
      }
    );

    if (response.ok) {
      setShowAlertSuccess(true);
      setKeySuccess((prev) => prev + 1);
      return;
    }
  };

  const logout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" }); // Limpa o cookie
  };

  const excluirConta = async () => {
    setConfirmLoading(true);
    await signOut({ redirect: true, callbackUrl: "/" }); // Limpa o cookie
    await fetch(`${process.env.NEXTAUTH_URL}/api/usuarios/${usuario.id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    });
    setConfirmLoading(false);
  };

  return (
    <>
      <div>
        <ul className={style.listaInfoUsuario}>
          <li className={style.infoUsuario}>
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
          <li className={style.infoUsuario}>
            <label>Email</label>
            <input disabled value={usuario.email} />
          </li>
          <li className={style.infoUsuario}>
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
          <li className={style.infoUsuario}>
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
          <h3>Outras ações</h3>
          <button className={style.btnSair} onClick={logout}>
            Sair
          </button>
          <Button
            type="primary"
            style={{ backgroundColor: "red" }}
            onClick={showModal}
          >
            Excluir
          </Button>
          <Modal
            title="Tem certeza que deseja excluir
              sua conta?"
            open={open}
            onOk={excluirConta}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText="Excluir"
            okType="danger"
            cancelText="Cancelar"
          >
            <p>Essa ação não poderá ser desfeita.</p>
          </Modal>
        </div>
      </div>

      {showAlertSuccess && (
        <Sucesso
          key={keySuccess}
          mensagem="Dados de perfil atualizados com êxito."
        />
      )}
      {showAlertWarning && (
        <Aviso
          key={keyWarning}
          mensagem="Preencha todos os campos com valores antes de atualizar seu perfil."
        />
      )}
    </>
  );
}

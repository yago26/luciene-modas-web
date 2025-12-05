"use client";

import { signOut } from "next-auth/react";
import style from "./infoUsuario.module.css";

import { useState } from "react";
import { Button, Modal, Divider, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Sucesso from "./toasts/Sucesso";
import Aviso from "./toasts/Aviso";
import Erro from "./toasts/Erro";
import { UserRound, Mail } from "lucide-react";
import { useEndereco } from "@/lib/useEndereco";

export default function infoUsuario({ usuario }) {
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [keySuccess, setKeySuccess] = useState(0);

  const [showAlertWarning, setShowAlertWarning] = useState(false);
  const [keyWarning, setKeyWarning] = useState(0);

  const [showAlertError, setShowAlertError] = useState(false);
  const [keyError, setKeyError] = useState(0);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nome: usuario.nome,
    cep: usuario.cep,
    estado: usuario.estado,
    cidade: usuario.cidade,
    bairro: usuario.bairro,
    rua: usuario.rua,
    numero: usuario.numero,
    complemento: usuario.complemento,
  });

  const {
    estados,
    cidades,
    buscarCEP,
    carregarCidades,
    buscarCEPporCidade,
    loadingCep,
  } = useEndereco(form, setForm);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const salvar = async () => {
    setLoading(true);
    const cepLimpo = form.cep.replace(/\D/g, "");

    if (!form.nome) {
      setShowAlertWarning(true);
      setKeyWarning((prev) => prev + 1);
      return;
    }

    const response = await fetch(
      `${process.env.NEXTAUTH_URL || ""}/api/usuarios/${usuario.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: form.nome,
          cep: cepLimpo,
        }),
      }
    );

    setLoading(false);

    if (response.ok) {
      setShowAlertSuccess(true);
      setKeySuccess((prev) => prev + 1);
      return;
    }

    setShowAlertError(true);
    setKeyError((prev) => prev + 1);
  };

  const logout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" }); // Limpa o cookie
  };

  const excluirConta = async () => {
    setConfirmLoading(true);
    await signOut({ redirect: true, callbackUrl: "/" }); // Limpa o cookie
    await fetch(
      `${process.env.NEXTAUTH_URL || ""}/api/usuarios/${usuario.id}`,
      {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      }
    );
    setConfirmLoading(false);
  };

  return (
    <>
      <div>
        <ul className={style.listaInfoUsuario}>
          <h3>Dados pessoais</h3>
          <li className={style.infoUsuario}>
            <label htmlFor="nome">Nome</label>
            <UserRound className={style.icone} />
            <input
              id="nome"
              type="text"
              placeholder="Nome"
              value={form.nome || ""}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              maxLength={255}
            />
          </li>

          <li className={style.infoUsuario}>
            <label htmlFor="email">Email</label>
            <Mail className={style.icone} />
            <input disabled id="email" value={usuario.email} />
          </li>

          <h3>Endereço</h3>

          {/* CEP */}
          <li className={style.infoUsuario}>
            <label>CEP</label>
            <input
              type="text"
              placeholder="12345-678"
              value={form.cep || ""}
              maxLength={9}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, ""); // remove tudo que não é número
                if (value.length > 8) value = value.slice(0, 8); // limita a 8 dígitos
                // Aplica a formatação do CEP automaticamente
                if (value.length > 5) {
                  value = value.replace(/(\d{5})(\d{1,3})/, "$1-$2");
                }
                setForm({ ...form, cep: value });
                if (value.length === 9) buscarCEP(value);
              }}
            />
            {loadingCep && <span>Buscando...</span>}
          </li>

          {/* Estado */}
          <li className={style.infoUsuario}>
            <label>Estado</label>
            <select
              value={form.estado || ""}
              onChange={(e) => {
                const estado = e.target.value;
                setForm({ ...form, estado, cidade: "", bairro: "" });
                carregarCidades(estado);
              }}
            >
              <option value="">Selecione</option>
              {estados.map((est) => (
                <option key={est.id} value={est.sigla}>
                  {est.nome}
                </option>
              ))}
            </select>
          </li>

          {/* Cidade */}
          <li className={style.infoUsuario}>
            <label>Cidade</label>
            <select
              value={form.cidade || ""}
              onChange={(e) => {
                const cidade = e.target.value;
                setForm({ ...form, cidade });

                buscarCEPporCidade(form.estado, cidade);
              }}
              disabled={!form.estado}
            >
              <option value="">Selecione</option>
              {cidades.map((cid) => (
                <option key={cid.id} value={cid.nome}>
                  {cid.nome}
                </option>
              ))}
            </select>
          </li>

          {/* Bairro */}
          <li className={style.infoUsuario}>
            <label>Bairro</label>
            <input
              type="text"
              value={form.bairro || ""}
              placeholder="Centro"
              onChange={(e) => setForm({ ...form, bairro: e.target.value })}
            />
          </li>

          {/* Rua */}
          <li className={style.infoUsuario}>
            <label>Rua</label>
            <input
              type="text"
              value={form.rua || ""}
              placeholder="São José"
              onChange={(e) => setForm({ ...form, rua: e.target.value })}
            />
          </li>

          {/* Número */}
          <li className={style.infoUsuario}>
            <label>Número</label>
            <input
              type="text"
              value={form.numero || ""}
              placeholder="949"
              onChange={(e) => setForm({ ...form, numero: e.target.value })}
            />
          </li>

          {/* Complemento */}
          <li className={style.infoUsuario}>
            <label>Complemento (Opcional)</label>
            <input
              type="text"
              value={form.complemento || ""}
              placeholder="Apartameto 221"
              onChange={(e) =>
                setForm({ ...form, complemento: e.target.value })
              }
            />
          </li>
        </ul>
        <Divider style={{ borderColor: "black" }} />
      </div>

      <button className={style.btnSalvar} onClick={salvar}>
        {loading ? (
          <Spin
            indicator={
              <LoadingOutlined
                style={{ color: "white", height: "100%", fontSize: 15 }}
                spin
              />
            }
          />
        ) : (
          "Salvar"
        )}
      </button>

      <div className={style.containerBtn}>
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
          mensagem="Preencha o campo 'Nome' com um valor válido antes de atualizar seu perfil."
        />
      )}
      {showAlertError && (
        <Erro
          key={keyError}
          mensagem="Ocorreu algum erro na atualização do seu perfil."
        />
      )}
    </>
  );
}

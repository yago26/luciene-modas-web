"use client";

import style from "./infoUsuario.module.css";

import { useState } from "react";
import { Divider, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Sucesso from "../toasts/Sucesso";
import Aviso from "../toasts/Aviso";
import Erro from "../toasts/Erro";
import {
  UserRound,
  Mail,
  Barcode,
  Map,
  Building,
  MapPin,
  Hash,
  FileText,
  Milestone,
} from "lucide-react";
import { useEndereco } from "@/lib/useEndereco";

export default function infoUsuario({ usuario }) {
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [keySuccess, setKeySuccess] = useState(0);

  const [showAlertWarning, setShowAlertWarning] = useState({
    mensagem: "",
    visivel: false,
  });
  const [keyWarning, setKeyWarning] = useState(0);

  const [showAlertError, setShowAlertError] = useState(false);
  const [keyError, setKeyError] = useState(0);

  const [loadingSalvarDadosPessoais, setLoadingSalvarDadosPessoais] =
    useState(false);
  const [loadingSalvarEndereco, setLoadingSalvarEndereco] = useState(false);

  const [form, setForm] = useState({
    nome: usuario.nome,
    cep: usuario.cep,
    cidade: usuario.cidade,
    bairro: usuario.bairro,
    rua: usuario.rua,
    numero: usuario.numero,
    complemento: usuario.complemento,
  });

  const { cidades, buscarCEP, loadingCep } = useEndereco(form, setForm);

  const salvar = (response) => {
    if (response.ok) {
      setShowAlertSuccess(true);
      setKeySuccess((prev) => prev + 1);
      return;
    }

    setShowAlertError(true);
    setKeyError((prev) => prev + 1);
  };

  const salvarDadosPessoais = async () => {
    setLoadingSalvarDadosPessoais(true);
    if (!form.nome) {
      setShowAlertWarning({
        mensagem:
          "Preencha o campo 'Nome' com um valor válido antes de atualizar seu perfil.",
        visivel: true,
      });
      setKeyWarning((prev) => prev + 1);
      setLoadingSalvarDadosPessoais(false);
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
        }),
      }
    );
    setLoadingSalvarDadosPessoais(false);
    salvar(response);
  };

  const salvarEndereco = async () => {
    setLoadingSalvarEndereco(true);
    const cepLimpo = form.cep.replace(/\D/g, "");

    const response = await fetch(
      `${process.env.NEXTAUTH_URL || ""}/api/usuarios/${usuario.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cep: cepLimpo,
          cidade: form.cidade,
          bairro: form.bairro,
          rua: form.rua,
          numero: form.numero,
          complemento: form.complemento,
        }),
      }
    );
    setLoadingSalvarEndereco(false);
    salvar(response);
  };

  return (
    <>
      <div className={style.infoUsuario}>
        <ul className={style.listaInfoUsuario}>
          <div className={style.containerDadosPessoais}>
            <h2>Dados pessoais</h2>
            <li className={style.infoUsuario}>
              <label htmlFor="nome">Nome</label>
              <div className={style.containerDado}>
                <UserRound className={style.icone} />
                <input
                  id="nome"
                  type="text"
                  placeholder="Nome"
                  autoComplete="off"
                  value={form.nome || ""}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  maxLength={255}
                />
              </div>
            </li>

            <li className={style.infoUsuario}>
              <label htmlFor="email">Email</label>
              <div className={`${style.containerDado} ${style.imutavel}`}>
                <Mail className={style.icone} />
                <input disabled id="email" value={usuario.email} />
              </div>
            </li>

            <Divider style={{ borderColor: "black" }} />

            <button className={style.btnSalvar} onClick={salvarDadosPessoais}>
              {loadingSalvarDadosPessoais ? (
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
          </div>

          <div className={style.containerEndereco}>
            <h2>Endereço</h2>
            {/* CEP */}
            <li className={style.infoUsuario}>
              <label>CEP</label>
              <div className={style.containerDado}>
                <Barcode className={style.icone} />

                <input
                  type="text"
                  value={form.cep?.replace(/(\d{5})(\d{1,3})/, "$1-$2") || ""}
                  placeholder="58000-000"
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "");
                    if (value.length > 8) value = value.slice(0, 8);

                    if (value.length > 5) {
                      value = value.replace(/(\d{5})(\d{1,3})/, "$1-$2");
                    }
                    setForm({ ...form, cep: value });
                  }}
                  onBlur={async (e) => {
                    let value = e.target.value.replace(/\D/g, "");
                    if (Number(value) < 58000000) {
                      value = "58000000";
                      setForm({ ...form, cep: "58000-000" });
                    }
                    if (Number(value) > 58999999) {
                      value = "58999999";
                      setForm({ ...form, cep: "58999-999" });
                    }
                    const cepValido = await buscarCEP(value);
                    if (!cepValido) {
                      setShowAlertWarning({
                        mensagem: "Informe um cep válido.",
                        visivel: true,
                      });
                      setKeyWarning((prev) => prev + 1);
                    }
                  }}
                  maxLength={9}
                />
              </div>
              {loadingCep && <span>Buscando...</span>}
            </li>

            {/* Estado */}
            <li className={style.infoUsuario}>
              <label>Estado</label>
              <div className={`${style.containerDado} ${style.imutavel}`}>
                <Map className={style.icone} />
                <input disabled id="estado" value={usuario.estado || "PB"} />
              </div>
            </li>

            {/* Cidade */}
            <li className={style.infoUsuario}>
              <label>Cidade</label>
              <div className={style.containerDado}>
                <Building className={style.icone} />
                <select
                  value={form.cidade || ""}
                  onChange={(e) => {
                    const cidade = e.target.value;
                    setForm({
                      ...form,
                      cidade,
                      cep: "",
                      bairro: "",
                      rua: "",
                    });
                  }}
                >
                  <option value="">Selecione</option>
                  {cidades.map((cid) => (
                    <option key={cid.id} value={cid.nome}>
                      {cid.nome}
                    </option>
                  ))}
                </select>
              </div>
            </li>

            {/* Bairro */}
            <li className={style.infoUsuario}>
              <label>Bairro</label>
              <div className={style.containerDado}>
                <MapPin className={style.icone} />
                <input
                  type="text"
                  value={form.bairro || ""}
                  placeholder="Centro"
                  onChange={(e) => setForm({ ...form, bairro: e.target.value })}
                />
              </div>
            </li>

            {/* Rua */}
            <li className={style.infoUsuario}>
              <label>Rua</label>
              <div className={style.containerDado}>
                <Milestone className={style.icone} />
                <input
                  type="text"
                  value={form.rua || ""}
                  placeholder="São José"
                  onChange={(e) => setForm({ ...form, rua: e.target.value })}
                />
              </div>
            </li>

            {/* Número */}
            <li className={style.infoUsuario}>
              <label>Número</label>
              <div className={style.containerDado}>
                <Hash className={style.icone} />
                <input
                  type="text"
                  value={form.numero || ""}
                  placeholder="949"
                  onChange={(e) => setForm({ ...form, numero: e.target.value })}
                />
              </div>
            </li>

            {/* Complemento */}
            <li className={style.infoUsuario}>
              <label>Complemento (Opcional)</label>
              <div className={style.containerDado}>
                <FileText className={style.icone} />
                <input
                  type="text"
                  value={form.complemento || ""}
                  placeholder="Apartameto 221"
                  onChange={(e) =>
                    setForm({ ...form, complemento: e.target.value })
                  }
                />
              </div>
            </li>

            <Divider style={{ borderColor: "black" }} />

            <button className={style.btnSalvar} onClick={salvarEndereco}>
              {loadingSalvarEndereco ? (
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
          </div>
        </ul>
      </div>

      {showAlertSuccess && (
        <Sucesso
          key={`s-${keySuccess}`}
          mensagem="Dados de perfil atualizados com êxito."
        />
      )}

      {showAlertWarning.visivel && (
        <Aviso key={`w-${keyWarning}`} mensagem={showAlertWarning.mensagem} />
      )}

      {showAlertError && (
        <Erro
          key={`e-${keyError}`}
          mensagem="Ocorreu algum erro na atualização do seu perfil."
        />
      )}
    </>
  );
}

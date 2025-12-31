"use client";

import { useEndereco } from "@/utils/useEndereco";
import Sucesso from "@/components/ui/toasts/Sucesso";
import Aviso from "@/components/ui/toasts/Aviso";
import Erro from "@/components/ui/toasts/Erro";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
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

import { useState } from "react";

import style from "./infoUsuario.module.css";
import Divider from "@/components/ui/Divider";
import Button from "@/components/ui/Button";

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

    let response;
    try {
      response = await fetch(
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
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingSalvarDadosPessoais(false);
    }

    if (response.ok) {
      setShowAlertSuccess(true);
      setKeySuccess((prev) => prev + 1);
      return;
    }

    setShowAlertError(true);
    setKeyError((prev) => prev + 1);
  };

  const salvarEndereco = async () => {
    setLoadingSalvarEndereco(true);
    const cepLimpo = form.cep.replace(/\D/g, "");

    let response;
    try {
      response = await fetch(
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
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingSalvarEndereco(false);
    }

    if (response.ok) {
      setShowAlertSuccess(true);
      setKeySuccess((prev) => prev + 1);
      return;
    }

    setShowAlertError(true);
    setKeyError((prev) => prev + 1);
  };

  return (
    <>
      <div className={style.infoUsuario}>
        <div className={style.sidebar}>
          <img src="#" alt="Foto de perfil" width={300} height={300} />
          <div className={style.dadosPessoais}>
            <h2>Dados pessoais</h2>
            <label htmlFor="nome">Nome</label>
            <div className={style.dados}>
              <UserRound className={style.icone} />
              <input
                id="nome"
                type="text"
                placeholder="Nome"
                autoComplete="off"
                value={form.nome || ""}
                onChange={(e) => {
                  const regex = /^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]+$/;
                  const value = e.target.value;
                  if (regex.test(value)) setForm({ ...form, nome: value });
                }}
                maxLength={255}
              />
            </div>

            <label htmlFor="email">Email</label>
            <div className={`${style.dados} ${style.imutavel}`}>
              <Mail className={style.icone} />
              <input disabled id="email" value={usuario.email} />
            </div>

            <Divider />

            <Button
              variante="principal normal w-100"
              loading={loadingSalvarDadosPessoais}
              handleClick={salvarDadosPessoais}
            >
              Salvar
            </Button>
          </div>
        </div>

        <div className={style.endereco}>
          <h2>Endereço</h2>
          {/* CEP */}
          <label htmlFor="cep">CEP</label>
          <div className={style.dados}>
            <Barcode className={style.icone} />

            <input
              id="cep"
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

          {/* Estado */}
          <label htmlFor="estado">Estado</label>
          <div className={`${style.dados} ${style.imutavel}`}>
            <Map className={style.icone} />
            <input disabled id="estado" value={usuario.estado || "PB"} />
          </div>

          {/* Cidade */}
          <label htmlFor="cidade">Cidade</label>
          <div className={style.dados}>
            <Building className={style.icone} />
            <select
              id="cidade"
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

          {/* Bairro */}
          <label htmlFor="bairro">Bairro</label>
          <div className={style.dados}>
            <MapPin className={style.icone} />
            <input
              id="bairro"
              type="text"
              value={form.bairro || ""}
              placeholder="Centro"
              onChange={(e) => {
                const regex = /^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]+$/;
                const value = e.target.value;
                if (regex.test(value) || value == "")
                  setForm({ ...form, bairro: value });
              }}
            />
          </div>

          {/* Rua */}
          <label htmlFor="rua">Rua</label>
          <div className={style.dados}>
            <Milestone className={style.icone} />
            <input
              id="rua"
              type="text"
              value={form.rua || ""}
              placeholder="São José"
              onChange={(e) => {
                const regex = /^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]+$/;
                const value = e.target.value;
                if (regex.test(value) || value == "")
                  setForm({ ...form, rua: value });
              }}
            />
          </div>

          {/* Número */}
          <label htmlFor="numero">Número</label>
          <div className={style.dados}>
            <Hash className={style.icone} />
            <input
              id="numero"
              type="text"
              value={form.numero || ""}
              placeholder="949"
              onChange={(e) => {
                const regex = /^\d+$/;
                const value = e.target.value;
                if (regex.test(value) || value == "")
                  setForm({ ...form, numero: value });
              }}
            />
          </div>

          {/* Complemento */}
          <label htmlFor="complemento">Complemento (Opcional)</label>
          <div className={style.dados}>
            <FileText className={style.icone} />
            <input
              id="complemento"
              type="text"
              value={form.complemento || ""}
              placeholder="Apartameto 221"
              onChange={(e) => {
                const regex = /^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]+$/;
                const value = e.target.value;
                if (regex.test(value) || value == "")
                  setForm({ ...form, complemento: value });
              }}
            />
          </div>

          <Divider />

          <Button
            variante="principal normal w-100"
            loading={loadingSalvarEndereco}
            handleClick={salvarEndereco}
          >
            Salvar
          </Button>
        </div>
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

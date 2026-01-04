"use client";

import { useEndereco } from "@/utils/useEndereco";
import Sucesso from "@/components/ui/toasts/Sucesso";
import Aviso from "@/components/ui/toasts/Aviso";
import Erro from "@/components/ui/toasts/Erro";

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

import style from "./infosUsuario.module.css";
import Divider from "@/components/ui/Divider";
import Button from "@/components/ui/Button";

export default function infosUsuario({ usuario }) {
  const [form, setForm] = useState({
    nome: usuario.nome,
    imagem: usuario.imagem,
    username: usuario.username,
    cep: usuario.cep,
    cidade: usuario.cidade,
    bairro: usuario.bairro,
    rua: usuario.rua,
    numero: usuario.numero,
    complemento: usuario.complemento,
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [keySuccess, setKeySuccess] = useState(0);

  const [showWarning, setShowWarning] = useState({
    mensagem: "",
    visivel: false,
  });
  const [keyWarning, setKeyWarning] = useState(0);

  const [showError, setShowError] = useState(false);
  const [keyError, setKeyError] = useState(0);

  const [loading, setLoading] = useState({
    atualizar: {
      dados_pessoais: false,
      endereco: false,
    },
  });

  const { cidades, buscarCEP, loadingCep } = useEndereco(form, setForm);

  const handleSubmit = {
    atualizar: {
      dados_pessoais: async () => {
        setLoading({
          ...loading,
          atualizar: { ...loading.atualizar, dados_pessoais: true },
        });

        if (!form.nome) {
          setShowWarning({
            mensagem:
              "Preencha o campo 'Nome' com um valor válido antes de atualizar seu perfil.",
            visivel: true,
          });
          setKeyWarning((prev) => prev + 1);
          setLoading({
            ...loading,
            atualizar: { ...loading.atualizar, dados_pessoais: false },
          });
          return;
        }

        try {
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

          if (response.ok) {
            setShowSuccess(true);
            setKeySuccess((prev) => prev + 1);
          } else {
            setShowError(true);
            setKeyError((prev) => prev + 1);
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading({
            ...loading,
            atualizar: { ...loading.atualizar, dados_pessoais: false },
          });
        }
      },

      endereco: async () => {
        setLoading({
          ...loading,
          atualizar: { ...loading.atualizar, endereco: true },
        });

        const cepLimpo = form.cep.replace(/\D/g, "");

        if (cepLimpo.length < 8) {
          setShowWarning({
            visivel: true,
            mensagem: "Informe um CEP válido e completo.",
          });
          setLoading({
            ...loading,
            atualizar: { ...loading.atualizar, endereco: false },
          });
          return;
        }

        try {
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

          if (response.ok) {
            setShowSuccess(true);
            setKeySuccess((prev) => prev + 1);
          } else {
            setShowError(true);
            setKeyError((prev) => prev + 1);
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoadingSalvarEndereco(false);
        }
      },
    },
  };

  return (
    <>
      <div className={style.infoUsuario}>
        <div className={style.sidebar}>
          <img
            className={style.imagem}
            src={usuario.imagem}
            alt="Foto de perfil"
            width={300}
            height={300}
          />
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

            <label htmlFor="username">Username</label>
            <div className={style.dados}>
              <Mail className={style.icone} />
              <input
                id="username"
                type="text"
                placeholder="Adicione um username"
                value={usuario.username ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setForm({ ...form, username: value });
                }}
              />
            </div>

            <Divider />

            <Button
              variante="principal normal w-100"
              loading={loading.atualizar.dados_pessoais}
              handleClick={async () =>
                await handleSubmit.atualizar.dados_pessoais()
              }
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
              onChange={async (e) => {
                let value = e.target.value.replace(/\D/g, "");

                if (value.length > 8) value = value.slice(0, 8);

                if (value.length > 5) {
                  value = value.replace(/(\d{5})(\d{1,3})/, "$1-$2");
                }

                setForm({ ...form, cep: value });

                if (value.length === 9) {
                  value = value.replace(/\D/g, "");

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
                    setShowWarning({
                      mensagem: "Informe um cep válido.",
                      visivel: true,
                    });

                    setKeyWarning((prev) => prev + 1);
                  }
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
            loading={loading.atualizar.endereco}
            handleClick={async () => await handleSubmit.atualizar.endereco()}
          >
            Salvar
          </Button>
        </div>
      </div>

      {showSuccess && (
        <Sucesso
          key={`s-${keySuccess}`}
          mensagem="Seus dados de perfil foram atualizados."
        />
      )}

      {showWarning.visivel && (
        <Aviso key={`w-${keyWarning}`} mensagem={showWarning.mensagem} />
      )}

      {showError && (
        <Erro
          key={`e-${keyError}`}
          mensagem="Ocorreu algum erro na atualização do seu perfil."
        />
      )}
    </>
  );
}

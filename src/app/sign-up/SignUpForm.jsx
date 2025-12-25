import { useState } from "react";
import style from "./signUpForm.module.css";
import { Eye, EyeOff, UserRound, Mail, Lock, LockOpen } from "lucide-react";
import Aviso from "../../components/toasts/Aviso";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function SignUpForm({ onAddUsuario, loading }) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [showWarningAlert, setShowWarningAlert] = useState({
    visivel: false,
    mensagem: "",
  });
  const [warningKey, setWarningKey] = useState(0);

  const handleSubmit = (e) => {
    /* Tira o funcionamento padrão do <form></form> */
    e.preventDefault();

    if (!form.nome.trim()) {
      setShowWarningAlert({
        visivel: true,
        mensagem:
          "Por favor, insira um nome válido. Não são permitidos nomes com apenas espaços em branco.",
      });
      setWarningKey((k) => k + 1);
      return;
    }

    const caracteresNome = form.nome.split("");
    let contador = 0;
    for (let caracter of caracteresNome) {
      if (caracter == " ") {
        if (++contador == 2) {
          setShowWarningAlert({
            visivel: true,
            mensagem:
              "Por favor, insira um nome válido. Não são permitidos nomes com espaços em branco seguidos.",
          });
          setWarningKey((k) => k + 1);
          return;
        }
      } else {
        contador = 0;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(form.email) ||
      (!form.email.endsWith("@gmail.com") &&
        !form.email.endsWith("@academico.ifpb.edu.br") &&
        !form.email.endsWith("@ifpb.edu.br"))
    ) {
      setShowWarningAlert({
        visivel: true,
        mensagem: `Por favor, insira um e-mail válido. Ex.: "email.valido@gmail.com".`,
      });
      setWarningKey((k) => k + 1);
      return;
    }

    if (form.senha.length < 8) {
      setShowWarningAlert({
        visivel: true,
        mensagem: "A senha deve conter pelo menos 8 dígitos.",
      });
      setWarningKey((k) => k + 1);
      return;
    }

    if (form.senha != confirmarSenha) {
      setShowWarningAlert({
        visivel: true,
        mensagem: `O campo "senha" e "confirmar senha" estão incoerentes entre si.`,
      });
      setWarningKey((k) => k + 1);
      return;
    }

    onAddUsuario({
      nome: form.nome,
      email: form.email,
      senha: form.senha,
    });

    setForm({
      nome: "",
      email: "",
      senha: "",
    });
    setConfirmarSenha("");
  };

  return (
    <>
      <form className={style.formulario} onSubmit={handleSubmit}>
        <h1>Sign Up</h1>

        <div>
          <div className={style.containerDado}>
            <UserRound className={style.icone} />
            <input
              aria-label="Nome"
              autoComplete="off"
              className="campoEntradaNome"
              type="text"
              name="nome-usuario"
              id="nome"
              placeholder="Nome"
              value={form.nome}
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]+$/;
                if (regex.test(value)) setForm({ ...form, nome: value });
              }}
              required
              maxLength={255}
            />
          </div>
        </div>

        <div>
          <div className={style.containerDado}>
            <Mail className={style.icone} />
            <input
              autoComplete="off"
              aria-label="E-mail"
              className="campoEntradaEmail"
              type="email"
              name="email-usuario"
              id="email"
              placeholder="E-mail"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              minLength={11}
              required
            />
          </div>
        </div>

        <div>
          <div className={style.containerSenha}>
            <Lock className={style.icone} />
            <input
              autoComplete="off"
              aria-label="Senha"
              className="campoEntradaSenhaCadastro"
              type={isShowPassword ? "text" : "password"}
              name="senha-cadastro"
              id="senhaCadastro"
              placeholder="Senha"
              value={form.senha}
              onChange={(e) =>
                setForm({ ...form, senha: e.target.value.replace(" ", "") })
              }
              required
            />
            <div
              className={style.verSenha}
              onClick={() => setIsShowPassword(!isShowPassword)}
              aria-label={isShowPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {isShowPassword ? (
                <Eye className={style.iconeAtivo} />
              ) : (
                <EyeOff className={style.icone} />
              )}
            </div>
          </div>
        </div>

        <div>
          <div className={style.containerDado}>
            <LockOpen className={style.icone} />
            <input
              autoComplete="off"
              aria-label="Confirmar senha"
              className="campoEntradaconfirmarSenhaCadastro"
              type="text"
              name="confirmar-senha-cadastro"
              id="confirmarSenhaCadastro"
              placeholder="Confirmar senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
          </div>
        </div>

        <button className={style.btnCadastrar} type={loading ? "" : "submit"}>
          {loading ? (
            <Spin
              indicator={
                <LoadingOutlined
                  style={{ color: "white", height: "100%", fontSize: 16 }}
                  spin
                />
              }
            />
          ) : (
            "Cadastrar"
          )}
        </button>
      </form>

      {showWarningAlert.visivel && (
        <Aviso key={warningKey} mensagem={showWarningAlert.mensagem} />
      )}
    </>
  );
}

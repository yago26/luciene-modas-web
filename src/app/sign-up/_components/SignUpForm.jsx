import { useState } from "react";
import style from "./signUpForm.module.css";
import { Eye, EyeOff, UserRound, Mail, Lock, LockOpen } from "lucide-react";
import Button from "@/components/ui/Button";

export default function SignUpForm({ onAddUsuario, loading }) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [showError, setShowError] = useState({
    nome: { visivel: false, mensagem: "" },
    email: { visivel: false, mensagem: "" },
    senha: { visivel: false, mensagem: "" },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setShowError({
      nome: { visivel: false, mensagem: "" },
      email: { visivel: false, mensagem: "" },
      senha: { visivel: false, mensagem: "" },
    });

    let errorCount = 0;

    if (!form.nome.trim()) {
      setShowError((prev) => {
        return {
          ...prev,
          nome: {
            visivel: true,
            mensagem: "Não são permitidos nomes com apenas espaços em branco.",
          },
        };
      });
      errorCount++;
    }

    const caracteresNome = form.nome.split("");
    let contador = 0;

    for (let caracter of caracteresNome) {
      if (caracter == " ") {
        if (++contador == 2) {
          setShowError((prev) => {
            return {
              ...prev,
              nome: {
                visivel: true,
                mensagem:
                  "Não são permitidos nomes com espaços em branco seguidos.",
              },
            };
          });
          errorCount++;
          break;
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
      setShowError((prev) => {
        return {
          ...prev,
          email: {
            visivel: true,
            mensagem: `E-mail inválido.`,
          },
        };
      });
      errorCount++;
    }

    if (form.senha.length < 8) {
      setShowError((prev) => {
        return {
          ...prev,
          senha: {
            visivel: true,
            mensagem: "A senha deve conter pelo menos 8 dígitos.",
          },
        };
      });
      errorCount++;
    }

    if (form.senha != confirmarSenha) {
      setShowError((prev) => {
        return {
          ...prev,
          senha: {
            visivel: true,
            mensagem: `O campo "senha" e "confirmar senha" estão incoerentes entre si.`,
          },
        };
      });
      errorCount++;
    }

    if (errorCount) {
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
        <div className={style.containerDado}>
          <UserRound className={style.icone} />
          <input
            type="text"
            aria-label="Nome"
            autoComplete="off"
            className="campoEntradaNome"
            placeholder="Nome"
            value={form.nome}
            onChange={(e) => {
              const value = e.target.value;
              const regex = /^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]+$/;
              if (regex.test(value) || value == "")
                setForm({ ...form, nome: value });
            }}
            required
            maxLength={255}
          />
        </div>

        {showError.nome.visivel && (
          <p className={style.error}>{showError.nome.mensagem}</p>
        )}

        <div className={style.containerDado}>
          <Mail className={style.icone} />
          <input
            type="email"
            autoComplete="off"
            aria-label="E-mail"
            className="campoEntradaEmail"
            placeholder="E-mail"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        {showError.email.visivel && (
          <p className={style.error}>{showError.email.mensagem}</p>
        )}

        <div>
          <div className={style.containerSenha}>
            <Lock className={style.icone} />
            <input
              autoComplete="off"
              aria-label="Senha"
              type={isShowPassword ? "text" : "password"}
              placeholder="Senha"
              value={form.senha}
              onChange={(e) => {
                const value = e.target.value;
                setForm({ ...form, senha: value.trim() });
              }}
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

        {showError.senha.visivel && (
          <p className={style.error}>{showError.senha.mensagem}</p>
        )}

        <div className={style.containerDado}>
          <LockOpen className={style.icone} />
          <input
            type="text"
            autoComplete="off"
            aria-label="Confirmar senha"
            placeholder="Confirmar senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
        </div>

        <Button
          key={"b-sign-up"}
          type={loading ? "" : "submit"}
          variante={"terciaria grande w-100"}
          loading={loading}
        >
          Cadastrar
        </Button>
      </form>
    </>
  );
}

/*
<button  >
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
*/

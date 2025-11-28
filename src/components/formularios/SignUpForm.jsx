import Link from "next/link";
import { useState } from "react";
import style from "./signUpForm.module.css";
import { Eye, EyeOff } from "lucide-react";
import Aviso from "../toasts/Aviso";

export default function SignUpForm({ onAddUsuario }) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cep: "",
    genero: "",
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      setShowWarningAlert({
        visivel: true,
        mensagem: "Por favor, insira um e-mail válido.",
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

    const cepLimpo = form.cep.replace(/\D/g, "");

    onAddUsuario({
      nome: form.nome,
      email: form.email,
      cep: cepLimpo,
      genero: form.genero,
      senha: form.senha,
    });

    setForm({
      nome: "",
      email: "",
      cep: "",
      genero: "",
      senha: "",
    });
    setConfirmarSenha("");
  };

  return (
    <>
      <div className={style.containerSignUp}>
        <form className={style.formSignUp} onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <div className={style.dadosCadastro}>
            <label htmlFor="nome">Nome</label>
            <input
              className="campoEntradaNome"
              type="text"
              name="nome-usuario"
              id="nome"
              placeholder="Nome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              required
              maxLength={255}
            />
            <label htmlFor="email">Email</label>
            <input
              className="campoEntradaEmail"
              type="email"
              name="email-usuario"
              id="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              minLength={12}
              // Fazer ser obrigatório incluir letras maiúsculas e minúsculas, números e símbolos especiais
              required
            />
            <label htmlFor="cep">CEP</label>
            <input
              className="campoEntradaUsuario"
              type="text"
              name="cep-usuario"
              id="cep"
              placeholder="12345-678"
              value={form.cep}
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
            <p className={style.genero}>Gênero</p>
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
            <label htmlFor="senhaCadastro">Senha</label>
            <div className={style.containerSenhaSignUp}>
              <input
                className="campoEntradaSenhaCadastro"
                type={isShowPassword ? "text" : "password"}
                name="senha-cadastro"
                id="senhaCadastro"
                placeholder="Senha"
                value={form.senha}
                onChange={(e) => setForm({ ...form, senha: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
            <label htmlFor="confirmarSenhaCadastro">Confirmar senha</label>
            <input
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
          <div className={style.finalizarCadastro}>
            <button type="submit">Cadastrar</button>
            <hr />
            <p>
              Já possui uma conta? <Link href="./login">Login</Link>
            </p>
          </div>
        </form>

        <div className={style.containerLateral}>
          <h2>Bem vindo(a), Novo Consumidor!</h2>
          <hr />
          <p>Inicie sua maravilhosa experiência na plataforma Luciene Modas</p>
        </div>

        {showWarningAlert.visivel && (
          <Aviso key={warningKey} mensagem={showWarningAlert.mensagem} />
        )}
      </div>
    </>
  );
}

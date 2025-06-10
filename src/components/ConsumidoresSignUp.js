import Link from "next/link";
import { useState } from "react";

export default function ConsumidoresSignUp({ onAddConsumidor }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cep, setCep] = useState("");
  const [genero, setGenero] = useState("");
  const [senhaCadastro, setSenhaCadastro] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {
    /* Tira o funcionamento padrão do <form></form> */
    e.preventDefault();
    /* Apaga os dados do formulário */
    if (!(senhaCadastro === senha)) {
      return alert(
        `Erro!\n O campo "senha" e "confirmar senha" estão incoerentes entre si.`
      );
    }

    onAddConsumidor({ nome, email, cep, genero, senha: senhaCadastro });
    setNome("");
    setEmail("");
    setCep("");
    setGenero("");
    setSenhaCadastro("");
    setSenha("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <div className="dadosCadastro">
        <label>
          Usuário
          <input
            className="campoEntradaUsuario"
            type="text"
            name="nome-usuario"
            id="usuario"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            className="campoEntradaEmail"
            type="email"
            name="email-usuario"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          CEP
          <input
            className="campoEntradaUsuario"
            type="text"
            name="cep-usuario"
            id="cep"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            required
          />
        </label>
        <label>
          Gênero
          <label htmlFor="campoEntradaGeneroMasculino">
            <input
              className="campoEntradaGeneroMasculino"
              type="radio"
              name="genero"
              id="masculino"
              value="Masculino"
              checked={genero === "Masculino"}
              onChange={(e) => setGenero(e.target.value)}
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
              checked={genero === "Feminino"}
              onChange={(e) => setGenero(e.target.value)}
            />
            Feminino
          </label>
          <label htmlFor="semIdentificacao">
            <input
              className="campoEntradaGeneroSemIdentificacao"
              type="radio"
              name="genero"
              id="semIdentificacao"
              value="NULL"
              checked={genero === "NULL"}
              onChange={(e) => setGenero(e.target.value)}
              required
            />
            Prefiro não informar
          </label>
        </label>
        <label>
          Senha
          <input
            className="campoEntradaSenhaCadastro"
            type="password"
            name="senha-cadastro"
            id="senhaCadastro"
            value={senhaCadastro}
            onChange={(e) => setSenhaCadastro(e.target.value)}
            required
          />
        </label>
        <label>
          Confirmar senha
          <input
            className="campoEntradaconfirmarSenhaCadastro"
            type="password"
            name="confirmar-senha-cadastro"
            id="confirmarSenhaCadastro"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </label>
      </div>

      <div className="finalizarCadastro">
        <button type="submit">Cadastrar</button>
        <hr />
        <p>
          Já possui uma conta? <Link href="./signIn">Login</Link>
        </p>
      </div>
    </form>
  );
}

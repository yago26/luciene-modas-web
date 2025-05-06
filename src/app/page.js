import style from "./page.module.css";

export default function Home() {
  return (
    <div className={style.content}>
      <main></main>
      <h1>Bem-vindo(a)!</h1>
      <p>Esta é a tela inicial</p>
      <ol className={style.listaDeRotas}>
        <li>
          <a href="./aula1">Criando Primeira Rota</a>
        </li>
        <li>
          <a href="./aula2">Estilizando Rotas</a>
        </li>
        <li>
          <a href="./aula3/usuario">
            Rota dentro de Rota e Conexão do Banco de Dados
          </a>
        </li>
        <li>
          <a href="./aula4">
            Utilizando tabelas a partir da Conexão com o Banco de Dados
          </a>
        </li>
      </ol>
    </div>
  );
}

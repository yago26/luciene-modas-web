import style from "./navbar.module.css";
import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  const categorias = [
    {
      id: 1,
      nome: "Masculino",
    },
    {
      id: 2,
      nome: "Feminino",
    },
    {
      id: 3,
      nome: "Infantil",
    },
    {
      id: 4,
      nome: "Cosméticos",
    },
  ]; /* Ligar com o BD posteriormente */

  return (
    <header className={style.header}>
      <div className={style.container}>
        <h1>
          <Link href="">Luciene Modas</Link>
        </h1>
        <div className={style.searchBar}>
          <Image
            id={style.imageIconEsquerda}
            className={style.imageIcon}
            src="icons/magnifying-glass-solid.svg"
            alt="Lupa de pesquisa"
            width={25}
            height={25}
          />
          <input
            className={style.inputSearchBar}
            type="search"
            name="search"
            placeholder="Busque por nossos produtos!"
          />
          <Image
            id={style.imageIconDireita}
            className={style.imageIcon}
            src="icons/close-circle-line.svg"
            alt="Botão de excluir texto"
            width={25}
            height={25}
          />
        </div>
        <ul className={style.ul}>
          <li>
            <button className={style.button} style={{ background: "none" }}>
              Sign In
            </button>
          </li>
          <li>
            <button
              className={style.button}
              style={{
                background: "var(--cor-texto)",
                color: "white",
                border: "none",
              }}
            >
              Sign Up
            </button>
          </li>
        </ul>
      </div>

      <nav className={style.navBar}>
        <ul className={style.ul}>
          {categorias.map((categoria) => (
            <li key={categoria.id}>
              <a href="">{categoria.nome}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

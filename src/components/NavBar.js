import Link from "next/link";
import Image from "next/image";
import style from "./navbar.module.css";

export default function NavBar() {
  let usuario = "";
  return (
    <>
      <header>
        <nav>
          <div className="barraFuncionalidades">
            <Link href="/">
              <Image
                src=""
                alt="Logo marca Luciene Modas - Roupas e Cosméticos"
                width={150}
                height={50}
              />
            </Link>

            <form action="">
              <input
                className="barraPesquisa"
                type="search"
                name="barra-pesquisa"
                id="barraPesquisa"
                placeholder="Buscar produtos"
              />
              <button>Buscar</button>
            </form>

            <ul>
              <div className={usuario ? style.visivel : style.invisivel}>
                <Link href="./shopCar">
                  <Image
                    src=""
                    alt="Carrinho de compras"
                    width={50}
                    height={50}
                  />
                </Link>
                <Link href="./usuario">
                  <Image src="" alt="Conta do usuário" width={50} height={50} />
                </Link>
              </div>

              <div className={usuario ? style.invisivel : style.visivel}>
                <Link href="./signIn">
                  <button>Login</button>
                </Link>
                <Link href="./signUp">
                  <button>Sign Up</button>
                </Link>
              </div>
            </ul>
          </div>

          <div className="linksRapidosCategorias">
            <ul>
              <li>
                <Link href="">Roupas Masculinas</Link>
              </li>
              <li>
                <Link href="">Roupas Femininas</Link>
              </li>
              <li>
                <Link href="">Roupas Infantis</Link>
              </li>
              <li>
                <Link href="">Cosméticos</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}

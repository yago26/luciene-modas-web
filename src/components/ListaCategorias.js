import style from "./listaCategorias.module.css";
import Image from "next/image";
import Link from "next/link";

export default function ListaCategorias() {
  return (
    <>
      <h4>Buscar por categorias</h4>
      <ul className={style.containerCategorias}>
        <li>
          <Link href="/categories/Roupa">
            <div className={style.categoria}>
              <Image src="" alt="Roupas" width={50} height={50} />
              <p>Roupas</p>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/categories/Cosmetico">
            <div className={style.categoria}>
              <Image src="" alt="Cosméticos" width={50} height={50} />
              <p>Cosméticos</p>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/categories/Masculino">
            <div className={style.categoria}>
              <Image src="" alt="Categoria Masculina" width={50} height={50} />
              <p>Masculino</p>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/categories/Feminino">
            <div className={style.categoria}>
              <Image src="" alt="Categoria Feminina" width={50} height={50} />
              <p>Feminino</p>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/categories/Infantil">
            <div className={style.categoria}>
              <Image src="" alt="Categoria Infantil" width={50} height={50} />
              <p>Infantil</p>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/categories/Infantil">
            <div className={style.categoria}>
              <Image src="" alt="Categoria Infantil" width={50} height={50} />
              <p>Outros</p>
            </div>
          </Link>
        </li>
      </ul>
    </>
  );
}

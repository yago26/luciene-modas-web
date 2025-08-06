import {
  Baby,
  Brush,
  EllipsisIcon,
  Mars,
  Shirt,
  VenusIcon,
} from "lucide-react";
import style from "./categoriasList.module.css";
import Link from "next/link";

export default function CategoriasList() {
  return (
    <>
      <h2>Buscar por categorias</h2>
      <ul className={style.containerCategorias}>
        <li>
          <Link href="/categories/Roupa">
            <div className={style.categoria}>
              <Shirt size={50} />
              <p>Roupas</p>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/categories/Cosmetico">
            <div className={style.categoria}>
              <Brush size={50} />
              <p>Cosméticos</p>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/categories/Masculino">
            <div className={style.categoria}>
              <Mars size={50} />
              <p>Masculino</p>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/categories/Feminino">
            <div className={style.categoria}>
              <VenusIcon size={50} />
              <p>Feminino</p>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/categories/Infantil">
            <div className={style.categoria}>
              <Baby size={50} />
              <p>Infantil</p>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/categories/Infantil">
            <div className={style.categoria}>
              <EllipsisIcon size={50} />
              <p>Outros</p>
            </div>
          </Link>
        </li>
      </ul>
    </>
  );
}

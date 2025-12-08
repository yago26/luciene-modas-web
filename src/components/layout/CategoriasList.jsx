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
    <div>
      <ul className={style.containerCategorias}>
        <li>
          <Link href="/categorias/roupas">
            <div className={style.categoria}>
              <Shirt size={50} />
              <p>Roupas</p>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/categorias/cosmeticos">
            <div className={style.categoria}>
              <Brush size={50} />
              <p>Cosméticos</p>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/categorias/masculino">
            <div className={style.categoria}>
              <Mars size={50} />
              <p>Masculino</p>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/categorias/feminino">
            <div className={style.categoria}>
              <VenusIcon size={50} />
              <p>Feminino</p>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/categorias/infantil">
            <div className={style.categoria}>
              <Baby size={50} />
              <p>Infantil</p>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/categorias/outros">
            <div className={style.categoria}>
              <EllipsisIcon size={50} />
              <p>Outros</p>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

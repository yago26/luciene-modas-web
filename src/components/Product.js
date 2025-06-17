import Link from "next/link";
import style from "./product.module.css";

export default function Product({ id, nome, sobre, valor, url }) {
  return (
    <>
      <div className={style.produto}>
        <Link className={style.ancora} href={`./productPage/${id}`}>
          <img src={url} alt={sobre} width={150} height={150} />
          <h3>{nome}</h3>
          <p>{sobre}</p>
          <p>{valor}</p>
        </Link>
        <button>Adicionar</button>
      </div>
    </>
  );
}

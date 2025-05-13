import style from "./produto.module.css";
import Link from "next/link";

export default function Produto({ id, nome, sobre, valor, url }) {
  return (
    <Link href={`/produtos/${id}`}>
      <img src={url} alt={sobre} />{" "}
      {/* Como pegar imagem do banco de da  dos ? */}
      <h3>{nome}</h3>
      <p>{sobre}</p>
      <p>{valor.replace(".", ",")}</p>
      <button className={style.button}>Adicionar</button>
    </Link>
  );
}

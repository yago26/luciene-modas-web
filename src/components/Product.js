import Link from "next/link";

export default function Product({ id, nome, sobre, valor, url }) {
  return (
    <>
      <div>
        <Link href={`./productPage/${id}`}>
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

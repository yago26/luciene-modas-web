"use client";

export default function ItemCheckout({ produto }) {
  const {
    id,
    nome,
    sobre,
    valor,
    imagem,
    quantidade,
    estoque,
    categoria,
    seubcategoria,
  } = produto;

  return (
    <article>
      <div key={id}>
        <img src={imagem} alt={sobre || nome} width={150} height={150} />
        <span>{nome}</span>
        <span>
          {quantidade} x R$ {Number(valor).toFixed(2)}
        </span>
      </div>
    </article>
  );
}

import CardProduto from "@/components/produtos/CardProduto";

import getUsuarioServerSide from "@/lib/getUsuarioServerSide";

export default async ({ params }) => {
  const consumidor = await getUsuarioServerSide();
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/produtos-disponiveis`
  );
  const produtos = await response.json();

  const { nome } = await params;
  let nomeFormatado = nome[0].toUpperCase() + nome.slice(1);
  if (nomeFormatado === "Cosmeticos") {
    nomeFormatado = "Cosméticos";
  }

  return (
    <>
      <h1>{nomeFormatado}</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-around",
          gap: "0.01%",
        }}
      >
        {produtos
          .filter((produto) => {
            if (produto.categoria === nome || produto.subcategoria === nome) {
              return produto;
            }
          })
          .map((produto) => {
            return (
              <CardProduto
                key={produto.id}
                produto={produto}
                consumidor={consumidor}
              />
            );
          })}
      </div>
    </>
  );
};

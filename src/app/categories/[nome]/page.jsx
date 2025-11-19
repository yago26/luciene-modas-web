import NavBar from "@/components/layout/NavBar";
import CardProduto from "@/components/produtos/CardProduto";

import getConsumidorServerSide from "@/lib/getConsumidorServerSide";

export default async ({ params }) => {
  const consumidor = await getConsumidorServerSide();
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/produtos`);
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
            if (consumidor) {
              if (produto.categoria === nome) {
                return produto;
              }
            } else {
              if (produto.categoria === nome) {
                return produto;
              }
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

import NotFound from "@/components/layout/NotFound";
import CardProduto from "@/components/produtos/CardProduto";

import getUsuarioServerSide from "@/lib/getUsuarioServerSide";
import { Divider } from "antd";

export default async ({ params }) => {
  const { nome } = await params;
  const usuario = await getUsuarioServerSide();

  const categoria = ["roupas", "cosmeticos", "outros"];
  const subcategoria = ["masculino", "feminino", "infantil", "outros"];

  let condition = "";

  if (categoria.find((c) => c == nome)) {
    condition = `categoria=${nome}`;
  } else if (subcategoria.find((s) => s == nome)) {
    condition = `subcategoria=${nome}`;
  } else {
    return (
      <>
        <NotFound
          titulo="Categoria inexistente!"
          mensagem="Essa categoria não existe na aplicação."
        />
      </>
    );
  }

  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/produtos?${condition}&estoque=disponivel`
  );
  const produtos = await response.json();

  let nomeFormatado = nome[0].toUpperCase() + nome.slice(1);
  if (nomeFormatado === "Cosmeticos") {
    nomeFormatado = "Cosméticos";
  }

  return (
    <>
      <h1>{nomeFormatado}</h1>
      <Divider style={{ borderColor: "black" }} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-around",
          gap: "0.01%",
        }}
      >
        {produtos.length == 0 ? (
          <NotFound
            titulo="Sem produtos!"
            mensagem="Infelizmente, não há produtos disponíveis nessa categoria no momento."
          />
        ) : (
          produtos
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
                  usuario={usuario}
                />
              );
            })
        )}
      </div>
    </>
  );
};

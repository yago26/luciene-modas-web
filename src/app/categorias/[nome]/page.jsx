import NotFound from "@/components/layout/NotFound";
import CardProduto from "@/components/produtos/CardProduto";

import getUsuarioServerSide from "@/utils/getUsuarioServerSide";

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
      <header>
        <h1 style={styles.titulo}>{nomeFormatado}</h1>
      </header>
      <div style={styles.produtos}>
        {produtos.length == 0 ? (
          <NotFound
            titulo="Sem produtos!"
            mensagem="Infelizmente, não há produtos disponíveis nessa categoria no momento."
          />
        ) : (
          produtos.map((produto) => {
            const propsCardProduto = {
              id: produto.id,
              nome: produto.nome,
              valor: produto.valor,
              imagem: produto.imagem,
              estoque: produto.estoque,
            };
            return (
              <CardProduto
                key={produto.id}
                produto={propsCardProduto}
                usuario={usuario}
              />
            );
          })
        )}
      </div>
    </>
  );
};

const styles = {
  titulo: {
    backgroundColor: "var(--cor-principal)",
    borderRadius: "10px",
    width: "min-content",
    padding: "20px",
  },
  produtos: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
    gap: "0.01%",
  },
};

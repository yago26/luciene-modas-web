import Gerenciamento from "@/components/gerenciamento/Gerenciamento";
import CategoriasList from "@/components/CategoriasList";
import ProdutosList from "@/components/produtos/ProdutosList";

export default async function Home() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "50px",
          justifyContent: "center",
        }}
      >
        <Gerenciamento />
        <CategoriasList />
        <ProdutosList />
      </div>
    </>
  );
}

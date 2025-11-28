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
        <CategoriasList />
        <ProdutosList />
      </div>
    </>
  );
}

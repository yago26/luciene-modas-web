import Gerenciamento from "@/components/gerenciamento/Gerenciamento";
import CategoriasList from "@/components/CategoriasList";
import ProdutosList from "@/components/produtos/ProdutosList";

export default async function Home() {
  return (
    <>
      <Gerenciamento />
      <CategoriasList />
      <ProdutosList />
    </>
  );
}

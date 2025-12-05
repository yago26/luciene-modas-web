import CategoriasList from "@/components/CategoriasList";
import ProdutosList from "@/components/produtos/ProdutosList";
import style from "./page.module.css";

export default async function Home() {
  return (
    <>
      <div className={style.container}>
        <CategoriasList />
        <ProdutosList />
      </div>
    </>
  );
}

import CategoriasList from "@/components/layout/CategoriasList";
import ProdutosList from "@/components/produtos/ProdutosList";
import style from "./page.module.css";

export default function Home() {
  return (
    <>
      <div className={style.container}>
        <CategoriasList />
        <ProdutosList />
      </div>
    </>
  );
}

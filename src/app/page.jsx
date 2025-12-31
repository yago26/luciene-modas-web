import ProdutosList from "@/components/produtos/ProdutosList";

import style from "./page.module.css";

export default function Home() {
  return (
    <>
      <div className={style.container}>
        <ProdutosList />
      </div>
    </>
  );
}

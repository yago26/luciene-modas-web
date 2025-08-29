import Gerenciamento from "@/components/gerenciamento/Gerenciamento";
import CategoriasList from "@/components/CategoriasList";
import ProdutosList from "@/components/produtos/ProdutosList";
import Loading from "./loading";

import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      {/*<Gerenciamento />*/}
      <CategoriasList />
      <Suspense fallback={<Loading />}>
        <ProdutosList />
      </Suspense>
    </>
  );
}

import Gerenciamento from "@/components/Gerenciamento";
import CategoriasList from "@/components/CategoriasList";
import ProdutosList from "@/components/ProdutosList";
import Loading from "./loading";

import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Gerenciamento />
      <CategoriasList />
      <Suspense fallback={<Loading />}>
        <ProdutosList />
      </Suspense>
    </>
  );
}

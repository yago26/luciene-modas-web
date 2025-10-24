import CarrinhoList from "@/components/CarrinhoList";
import getConsumidorServerSide from "@/lib/getConsumidorServerSide";
import Loading from "@/app/loading";
import { Suspense } from "react";

export default async function ShopCar() {
  const consumidor = await getConsumidorServerSide();

  return (
    <>
      <h1>Olá, {consumidor.nome}!</h1>
      <h2>Esse é o seu Carrinho de Compras</h2>
      <hr />
      <Suspense fallback={<Loading />}>
        <CarrinhoList />
      </Suspense>
    </>
  );
}

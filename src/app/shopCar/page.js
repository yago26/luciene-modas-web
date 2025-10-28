import CarrinhoList from "@/components/carrinho/CarrinhoList";
import getConsumidorServerSide from "@/lib/getConsumidorServerSide";

export default async function ShopCar() {
  const consumidor = await getConsumidorServerSide();

  return (
    <>
      <h1>Olá, {consumidor.nome}!</h1>
      <h2>Esse é o seu Carrinho de Compras</h2>
      <hr />
      <CarrinhoList />
    </>
  );
}

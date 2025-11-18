import CarrinhoList from "@/components/carrinho/CarrinhoList";
import getConsumidorServerSide from "@/lib/getConsumidorServerSide";
import { Divider } from "antd";

export default async function ShopCar() {
  const consumidor = await getConsumidorServerSide();

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Olá, {consumidor.nome}!</h1>
        <h2>Esse é o seu Carrinho de Compras</h2>
      </div>
      <Divider style={{ borderColor: "black" }} />
      <CarrinhoList />
    </>
  );
}

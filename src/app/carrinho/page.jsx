import CarrinhoList from "@/components/carrinho/CarrinhoList";
import getUsuarioServerSide from "@/lib/getUsuarioServerSide";
import { Divider } from "antd";

export default async function Carrinho() {
  const usuario = await getUsuarioServerSide();

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Olá, {usuario.nome}!</h1>
        <h2>Esse é o seu Carrinho de Compras</h2>
      </div>
      <Divider style={{ borderColor: "black" }} />
      <CarrinhoList />
    </>
  );
}

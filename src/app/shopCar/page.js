import CarrinhoList from "@/components/CarrinhoList";
import getConsumidor from "@/lib/getConsumidor";

export default async function ShopCar() {
  const consumidor = await getConsumidor();

  const genero = consumidor.genero;

  return (
    <>
      <h1>
        Bem vind
        {genero === "Masculino" ? "o" : genero === "Feminino" ? "a" : "(o)a"}!
      </h1>
      <h2>Esse é o seu Carrinho de Compras</h2>
      <hr />
      <CarrinhoList consumidor={consumidor} />
    </>
  );
}

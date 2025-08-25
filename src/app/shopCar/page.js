import { cookies } from "next/headers";
import { verificarToken } from "@/lib/auth";
import CarrinhoList from "@/components/CarrinhoList";

export default async function ShopCar() {
  const cookie = (await cookies()).toString();
  const usuario = verificarToken(cookie);

  const genero = usuario.genero;

  return (
    <>
      <h1>
        Bem vind
        {genero === "Masculino" ? "o" : genero === "Feminino" ? "a" : "(o)a"}!
      </h1>
      <h2>Esse é o seu Carrinho de Compras</h2>
      <hr />
      <CarrinhoList usuario={usuario} />
    </>
  );
}

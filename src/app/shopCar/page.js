import { cookies } from "next/headers";
import { verificarToken } from "@/lib/auth";
import CarrinhoList from "@/components/CarrinhoList";

export default function ShopCar() {
  const cookie = cookies().toString();
  const usuario = verificarToken(cookie);

  return (
    <>
      <CarrinhoList usuario={usuario} />
    </>
  );
}

import CarrinhoList from "@/components/carrinho/CarrinhoList";
import getUsuarioServerSide from "@/lib/getUsuarioServerSide";

export default async function Carrinho() {
  const usuario = await getUsuarioServerSide();

  return (
    <>
      <header style={style.header}>
        <h1>Olá, {usuario.nome}!</h1>
        <h2>Esse é o seu Carrinho de Compras</h2>
      </header>
      <CarrinhoList />
    </>
  );
}

const style = {
  header: {
    textAlign: "center",
    marginBottom: "75px",
  },
};

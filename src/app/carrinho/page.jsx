import ItemsCarrinhoList from "@/app/carrinho/ItemsCarrinhoList";
import getUsuarioServerSide from "@/lib/getUsuarioServerSide";

export default async function Carrinho() {
  const usuario = await getUsuarioServerSide();

  if (!usuario) return;

  return (
    <>
      <header style={style.header}>
        <h1>Olá, {usuario.nome}!</h1>
        <h2>Esse é o seu Carrinho de Compras</h2>
      </header>
      <ItemsCarrinhoList />
    </>
  );
}

const style = {
  header: {
    textAlign: "center",
    marginBottom: "75px",
  },
};

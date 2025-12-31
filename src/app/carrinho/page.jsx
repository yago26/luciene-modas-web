import getUsuarioServerSide from "@/utils/getUsuarioServerSide";
import ClientComponent from "./components/ClientComponent";

export default async function Carrinho() {
  const usuario = await getUsuarioServerSide();

  if (!usuario) {
    return;
  }

  return (
    <>
      <header style={style.header}>
        <h1>Olá, {usuario.nome.split(" ")[0]}!</h1>
        <h2>Esse é o seu Carrinho de Compras</h2>
      </header>
      <ClientComponent />
    </>
  );
}

const style = {
  header: {
    textAlign: "center",
    marginBottom: "75px",
  },
};

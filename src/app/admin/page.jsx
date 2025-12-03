import Gerenciamento from "@/components/gerenciamento/PainelGerenciamento";
import NotFound from "@/components/layout/NotFound";
import getUsuarioServerSide from "@/lib/getUsuarioServerSide";

export default async function Admin() {
  const usuario = await getUsuarioServerSide();

  if (usuario.role != "administrador" && usuario.role != "funcionário") {
    return (
      <NotFound
        titulo="Sem permissão!"
        mensagem="Você não tem privilégio de acesso a essa página. Volte a página de compras."
      />
    );
  }

  return (
    <>
      <h1>Painel de Gerenciamento</h1>
      <Gerenciamento />
    </>
  );
}

import InformacoesConsumidor from "@/components/InfoUsuario";

import getUsuarioServerSide from "@/lib/getUsuarioServerSide";
import { Divider } from "antd";

export default async function Profile() {
  const consumidor = await getUsuarioServerSide();

  return (
    <>
      <h1>Perfil de Usuário</h1>
      <Divider style={{ borderColor: "black" }} />
      <InformacoesConsumidor consumidor={consumidor} />
    </>
  );
}

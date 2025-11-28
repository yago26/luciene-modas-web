import InfoUsuario from "@/components/InfoUsuario";

import getUsuarioServerSide from "@/lib/getUsuarioServerSide";
import { Divider } from "antd";

export default async function Perfil() {
  const consumidor = await getUsuarioServerSide();

  return (
    <>
      <h1>Perfil de Usuário</h1>
      <Divider style={{ borderColor: "black" }} />
      <InfoUsuario consumidor={consumidor} />
    </>
  );
}

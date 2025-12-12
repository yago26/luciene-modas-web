import InfoUsuario from "@/components/perfil/InfoUsuario";
import OutrasAcoesUsuario from "@/components/perfil/OutrasAcoesUsuario";

import getUsuarioServerSide from "@/lib/getUsuarioServerSide";
import { Divider } from "antd";

export default async function Perfil() {
  const usuario = await getUsuarioServerSide();

  return (
    <>
      <div style={style.header}>
        <h1>Perfil de Usuário</h1>
        <OutrasAcoesUsuario usuario={usuario} />
      </div>
      <Divider style={{ borderColor: "black" }} />
      <InfoUsuario usuario={usuario} />
    </>
  );
}

const style = {
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
};

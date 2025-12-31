import InfoUsuario from "./components/InfoUsuario";
import OutrasAcoesUsuario from "./components/OutrasAcoesUsuario";

import getUsuarioServerSide from "@/utils/getUsuarioServerSide";
import { Divider } from "antd";

export default async function Perfil() {
  const usuario = await getUsuarioServerSide();

  return (
    <>
      <div style={style.header}>
        <h1>Bem-vindo ao seu perfil!</h1>
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

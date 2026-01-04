import InfosUsuario from "./_components/InfosUsuario";
import OutrasAcoesUsuario from "./_components/OutrasAcoesUsuario";

import getUsuarioServerSide from "@/utils/getUsuarioServerSide";
import { Divider } from "antd";

export default async function Perfil() {
  const completo = true;
  const usuario = await getUsuarioServerSide(completo);

  return (
    <>
      <div style={style.header}>
        <h1>Bem-vindo ao seu perfil!</h1>
      </div>
      <Divider style={{ borderColor: "black" }} />
      <InfosUsuario usuario={usuario} />
      <OutrasAcoesUsuario usuario={usuario} />
    </>
  );
}

const style = {
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
};

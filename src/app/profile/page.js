import InformacoesConsumidor from "@/components/InformacoesConsumidor";

import getConsumidorServerSide from "@/lib/getConsumidorServerSide";
import { Divider } from "antd";

export default async function Profile() {
  const consumidor = await getConsumidorServerSide();

  return (
    <>
      <h1>Perfil de Usuário</h1>
      <Divider style={{ borderColor: "black" }} />
      <InformacoesConsumidor consumidor={consumidor} />
    </>
  );
}

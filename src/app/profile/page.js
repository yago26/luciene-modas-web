import InformacoesConsumidor from "@/components/InformacoesConsumidor";

import getConsumidorServerSide from "@/lib/getConsumidorServerSide";

export default async function Profile() {
  const consumidor = await getConsumidorServerSide();

  return (
    <>
      <h1>Perfil do Usuário</h1>
      <hr />
      <InformacoesConsumidor consumidor={consumidor} />
    </>
  );
}

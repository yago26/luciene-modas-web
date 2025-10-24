import InformacoesConsumidor from "@/components/InformacoesConsumidor";

import getConsumidorServerSide from "@/lib/getConsumidorServerSide";

export default async function Profile() {
  const consumidor = await getConsumidorServerSide();

  return (
    <>
      <InformacoesConsumidor consumidor={consumidor} />
    </>
  );
}

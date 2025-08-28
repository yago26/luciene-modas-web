import InformacoesConsumidor from "@/components/InformacoesConsumidor";

import getConsumidor from "@/lib/getConsumidor";

export default async function Profile() {
  const consumidor = await getConsumidor();

  return (
    <>
      <InformacoesConsumidor consumidor={consumidor} />
    </>
  );
}

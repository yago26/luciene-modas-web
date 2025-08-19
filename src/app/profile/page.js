import InformacoesUsuario from "@/components/InformacoesUsuario";

import { cookies } from "next/headers";
import { verificarToken } from "@/lib/auth";

export default async function Profile() {
  const cookie = (await cookies()).toString();
  const usuario = verificarToken(cookie);

  if (!usuario) {
    return <></>;
  }

  return (
    <>
      <InformacoesUsuario usuario={usuario} />
    </>
  );
}

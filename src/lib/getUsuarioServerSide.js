import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function getUsuarioServerSide() {
  const session = await getServerSession(authOptions);

  let usuario = null;

  if (session?.user?.id) {
    const id_usuario = session.user.id;
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/usuarios/${id_usuario}`
    );
    ("");
    usuario = await res.json();
  }

  return usuario;
}

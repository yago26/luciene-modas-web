import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function getConsumidorServerSide() {
  const session = await getServerSession(authOptions);

  let consumidor = null;

  if (session?.user?.id) {
    const idConsumidor = session.user.id;
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/consumidores/${idConsumidor}`
    );
    consumidor = await res.json();
  }

  return consumidor;
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // se você tiver authOptions definido

export default async function getConsumidor() {
  const session = await getServerSession(authOptions);

  let consumidor = null;

  if (session?.consumidor?.id) {
    const idConsumidor = session.consumidor.id;
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/consumidores/${idConsumidor}`
    );
    consumidor = await res.json();
  }

  return consumidor;
}

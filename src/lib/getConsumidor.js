import { cookies } from "next/headers";
// import { verificarToken } from "@/lib/auth";

export default async () => {
  return null;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value; // pegar apenas o valor (string)

  if (!token) {
    return null; // ou lançar erro de não autenticado
  }

  const consumidor = await verificarToken(token);
  return consumidor || null;
};

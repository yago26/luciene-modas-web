export default async (session) => {
  if (!session) return null;

  const idConsumidor = session.consumidor.id;

  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/consumidores/${idConsumidor}`
  );
  const data = response.json();

  return data;
};

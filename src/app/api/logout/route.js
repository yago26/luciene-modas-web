export async function GET() {
  return new Response(null, {
    status: 200,
    headers: {
      "Set-Cookie": `token=; Path=/; HttpOnly; Max-Age=0`,
    },
  });
}

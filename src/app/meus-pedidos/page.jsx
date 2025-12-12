import { Divider } from "antd";
import NotFound from "@/components/layout/NotFound";

export default async function MeusPedidos() {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/pedidos`, {
    cache: "no-store",
  });

  if (!response.ok) {
    const erro = await response.json();

    return (
      <NotFound
        titulo="Erro ao carregar pedidos"
        mensagem={erro.error || "Tente novamente mais tarde."}
        caminho="/"
      />
    );
  }

  const pedidos = await response.json();

  return (
    <>
      <h1>Meus pedidos</h1>
      <Divider style={{ borderColor: "black" }} />

      <div className="containerPedidos">
        {!Array.isArray(pedidos) || pedidos.length === 0 ? (
          <NotFound
            titulo="Nenhum pedido cadastrado!"
            mensagem="Realize uma compra para visualizar seus pedidos."
            caminho="/"
          />
        ) : (
          pedidos.map((p) => (
            <div key={p.id}>
              <h3>{p.id}</h3>
            </div>
          ))
        )}
      </div>
    </>
  );
}

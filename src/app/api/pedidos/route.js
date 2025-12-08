import { v4 as uuidv4 } from "uuid";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { usuario, produtos } = await req.json();
    const idPedido = uuidv4();

    const total = produtos.reduce((acc, p) => acc + p.preco * p.quantidade, 0);
    await db.query(
      "INSERT INTO pedidos (id, id_usuario, total) VALUES ($1, $2, $3)",
      [idPedido, usuario.id, total] // substitua por id real do usuário autenticado
    );

    for (const p of produtos) {
      await db.query(
        "INSERT INTO itens_pedido (id, id_pedido, id_produto, quantidade, valor_unitario) VALUES ($1, $2, $3, $4, $5)",
        [uuidv4(), idPedido, p.id, p.quantidade, p.valor]
      );
    }

    return NextResponse.json(
      { mensagem: "Pedido finalizado" },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json(
      { erro: "Erro ao finalizar pedido" },
      { status: 500 }
    );
  }
}

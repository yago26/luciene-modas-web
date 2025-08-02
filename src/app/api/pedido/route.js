import { v4 as uuidv4 } from "uuid";
import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { usuario, produtos } = await req.json();
  const idPedido = uuidv4();

  try {
    const total = produtos.reduce((acc, p) => acc + p.preco * p.quantidade, 0);
    await pool.query(
      "INSERT INTO tb_pedidos (id, id_usuario, total) VALUES ($1, $2, $3)",
      [idPedido, usuario.id, total] // substitua por id real do usuário autenticado
    );

    for (const p of produtos) {
      await pool.query(
        "INSERT INTO tb_itens_pedido (id, id_pedido, id_produto, quantidade, preco_unitario) VALUES ($1, $2, $3, $4, $5)",
        [uuidv4(), idPedido, p.id, p.quantidade, p.preco]
      );
    }

    return NextResponse.json({ mensagem: "Pedido finalizado" });
  } catch (e) {
    return NextResponse.json(
      { erro: "Erro ao finalizar pedido" },
      { status: 500 }
    );
  }
}

import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const result = await db.query(
      `SELECT 
        p.id,
        p.total,
        p.entrega,
        p.pagamento,
        p.data_criacao,
        p.data_emissao_entrega,
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', i.id,
            'quantidade', i.quantidade,
            'produto', JSON_BUILD_OBJECT(
              'id', pr.id,
              'nome', pr.nome,
              'valor', pr.valor,
              'estoque', pr.estoque,
              'imagem', pr.imagem
            )
          )
        ) AS itens_pedido
      FROM pedidos p
      JOIN itens_pedido i ON p.id = i.id_pedido
      JOIN produtos pr ON pr.id = i.id_produto
      WHERE p.id_usuario = $1
      GROUP BY p.id
      ORDER BY p.data_criacao DESC;`,
      [id]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.log("Erro ao listar pedidos", error);
    return NextResponse.json(
      { error: "Erro interno ao listar pedidos." },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    db.query(`DELETE FROM pedidos WHERE id = $1`, [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("Erro ao deletar pedido", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

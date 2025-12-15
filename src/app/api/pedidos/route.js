import { v4 as uuidv4 } from "uuid";
import db from "@/lib/db";
import { NextResponse } from "next/server";
import getUsuarioServerSide from "@/lib/getUsuarioServerSide";

export async function POST(req) {
  const client = await db.connect();

  try {
    const usuario = await getUsuarioServerSide();

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuário não encontrado." },
        { status: 404 }
      );
    }

    const { cep, estado, cidade, bairro, rua, numero, complemento } = usuario;

    if (!cep || !estado || !cidade || !bairro || !rua || !numero) {
      return NextResponse.json(
        { error: "Preencha os dados de endereço antes de finalizar o pedido." },
        { status: 400 }
      );
    }

    const { itens, total } = await req.json();

    if (!itens || itens.length === 0) {
      return NextResponse.json(
        { error: "Nenhum item no pedido." },
        { status: 400 }
      );
    }

    if (typeof total !== "number" || total <= 0) {
      return NextResponse.json({ error: "Total inválido." }, { status: 400 });
    }

    // inicia transação para não salvar pedido incompleto se der erro
    await client.query("BEGIN");

    const idPedido = uuidv4();

    const dataBrasil = new Date().toLocaleString("sv-SE", {
      timeZone: "America/Sao_Paulo",
    });

    // cria pedido
    await client.query(
      `INSERT INTO pedidos (
        id, 
        id_usuario,
        total,
        cep,
        estado,
        cidade,
        bairro,
        rua,
        numero,
        complemento, 
        data_criacao
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        idPedido,
        usuario.id,
        total,
        cep,
        estado,
        cidade,
        bairro,
        rua,
        numero,
        complemento,
        dataBrasil,
      ]
    );

    // processa itens
    for (const item of itens) {
      await client.query(
        "INSERT INTO itens_pedido (id, id_pedido, id_produto, quantidade) VALUES ($1, $2, $3, $4)",
        [uuidv4(), idPedido, item.id_produto, item.quantidade]
      );

      // remove item do carrinho
      await client.query("DELETE FROM itens_carrinho WHERE id = $1", [item.id]);
    }

    await client.query("COMMIT");

    return NextResponse.json(
      { mensagem: "Pedido finalizado com sucesso." },
      { status: 201 }
    );
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Erro ao finalizar pedido:", error);
    return NextResponse.json(
      { error: error?.message || "Erro interno ao listar pedidos." },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

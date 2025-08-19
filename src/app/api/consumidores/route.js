/*
Deu certo:
  200 -> OK
  201 -> Entidade criada
  204 -> Entidade deletada
*/
/*
Deu errado, mas continuou rodando:
  400 -> Bad request (Não passar todos os dados requeridos)
  401 -> Unautorhized (Tentar executar alguma ação sem estar autenticado)
  403 -> Forbidden (Está autenticado, mas tenta fazer algo que não tem permissão -> Deletar um comentário que não te pertence)
  404 -> not found (Recurso não encontrado)
*/
/*
Crashou o servidor:
  500 -> Servidor error
  502 -> Bad gateway
  503 -> Service unavailable
*/

import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const result = await db.query("SELECT * FROM tb_consumidores");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Erro ao listar consumidores:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

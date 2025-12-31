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

import db from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const result = await db.query(
      "SELECT u.id, u.nome, u.email, u.role FROM usuarios u"
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { nome, email, senha } = await req.json();

    if (!nome || !email || !senha) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const existe = await db.query("SELECT id FROM usuarios WHERE email = $1", [
      email,
    ]);

    if (existe.rowCount > 0) {
      return NextResponse.json(
        { error: "E-mail já cadastrado" },
        { status: 400 }
      );
    }

    const senha_hash = await bcrypt.hash(senha, 12);
    const idUsuario = uuidv4();

    await db.query(
      "INSERT INTO usuarios (id, nome, email, senha, role) VALUES ($1, $2, $3, $4, $5)",
      [idUsuario, nome.trim(), email, senha_hash, "consumidor"]
    );

    const idCarrinho = uuidv4();
    await db.query("INSERT INTO carrinhos (id, id_usuario) VALUES ($1, $2)", [
      idCarrinho,
      idUsuario,
    ]);

    return NextResponse.json(
      { mensagem: "Usuário cadastrado" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Erro ao adicionar novo usuário. ", error.message, error.stack);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

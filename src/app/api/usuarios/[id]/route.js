import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const { searchParams } = new URL(req.url);
    const completo = searchParams.has("completo");

    const allowColumns = {
      completo: `id, nome, imagem, username, role, email,
        cep, estado, cidade, bairro, rua, numero, complemento`,
      incompleto: "id, nome, imagem, role, username",
    };

    const colunas = completo ? allowColumns.completo : allowColumns.incompleto;

    const result = await db.query(
      `SELECT 
        ${colunas}
      FROM usuarios
      WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }
    const usuario = result.rows[0];
    return NextResponse.json(usuario, { status: 200 });
  } catch (error) {
    console.log("Erro ao buscar usuário:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    const result = await db.query("SELECT * FROM usuarios WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    await db.query("DELETE FROM usuarios WHERE id = $1", [id]);

    await db.query("DELETE FROM carrinhos WHERE id_usuario = $1", [id]);

    return NextResponse.json(
      {
        message: "Usuário removido com sucesso",
      },
      { status: 204 }
    );
  } catch (error) {
    console.log("Erro ao remover usuário:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const { nome, cep, estado, cidade, bairro, rua, numero, complemento } =
      body;

    // Montar atualização dinâmica
    const campos = [];
    const valores = [];
    let contador = 1;

    // Só adiciona ao SQL se o valor existir
    if (nome !== undefined) {
      if (!nome) {
        return NextResponse.json(
          { error: "O campo 'nome' é obrigatório." },
          { status: 400 }
        );
      }
      campos.push(`nome = $${contador}`);
      valores.push(nome);
      contador++;
    }
    if (cep !== undefined) {
      campos.push(`cep = $${contador}`);
      valores.push(cep);
      contador++;
    }
    if (estado !== undefined) {
      campos.push(`estado = $${contador}`);
      valores.push(estado);
      contador++;
    }
    if (cidade !== undefined) {
      campos.push(`cidade = $${contador}`);
      valores.push(cidade);
      contador++;
    }
    if (bairro !== undefined) {
      campos.push(`bairro = $${contador}`);
      valores.push(bairro);
      contador++;
    }
    if (rua !== undefined) {
      campos.push(`rua = $${contador}`);
      valores.push(rua);
      contador++;
    }
    if (numero !== undefined) {
      campos.push(`numero = $${contador}`);
      valores.push(numero);
      contador++;
    }
    if (complemento !== undefined) {
      campos.push(`complemento = $${contador}`);
      valores.push(complemento);
      contador++;
    }

    if (campos.length === 0) {
      return NextResponse.json(
        { error: "Nenhum dado enviado para atualização." },
        { status: 400 }
      );
    }

    // Finaliza SQL
    const query = `
      UPDATE usuarios
      SET ${campos.join(", ")}
      WHERE id = $${contador}
    `;
    valores.push(id);

    await db.query(query, valores);

    return NextResponse.json(
      { message: "Usuário atualizado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Erro ao atualizar informações de usuário:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

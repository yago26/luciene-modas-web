// Importações
import { v4 as uuidv4 } from "uuid";
import db from "@/lib/db"; // conexão com o banco de dados
import bcrypt from "bcryptjs"; // biblioteca de criptografia de senhas (utiliza hash)
import { NextResponse } from "next/server";

export async function POST(req) {
  // Função assíncrona chamada POST, para enviar dados ao Banco de Dados

  try {
    // primeiramente, tente isso
    const {
      nome,
      email,
      cep,
      genero,
      senha,
      role = "cliente",
    } = await req.json(); // req é a requisição de cadastro feita pelo usuário a partir dos dados do próprio cadastro

    // validação para campos vazios
    if (!nome || !email || !cep || !genero || !senha) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const existe = await db.query(
      "SELECT id FROM tb_consumidores WHERE email = $1",
      [email]
    );

    if (existe.rowCount > 0) {
      return NextResponse.json(
        { error: "E-mail já cadastrado" },
        { status: 400 }
      );
    }

    const senha_hash = await bcrypt.hash(senha, 12); // Antes era 10
    const idConsumidor = uuidv4(); // Geração de ID único

    await db.query(
      "INSERT INTO tb_consumidores (id, nome, email, cep, genero, senha, role) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [idConsumidor, nome, email, cep, genero, senha_hash, role]
    );

    const idCarrinho = uuidv4(); // Geração de ID único
    await db.query(
      "INSERT INTO tb_carrinhos (id, id_consumidor) VALUES ($1, $2)",
      [idCarrinho, idConsumidor]
    );

    return NextResponse.json(
      { mensagem: "Consumidor cadastrado" },
      { status: 201 }
    );
  } catch (error) {
    // caso a tentativa falhe, tente isso (Provavelmente não tá conectado com o Banco de Dados)
    console.log(
      "Erro ao adicionar novo consumidor. ",
      error.message,
      error.stack
    );
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

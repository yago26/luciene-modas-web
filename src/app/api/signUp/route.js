// Importações
import { v4 as uuidv4 } from "uuid";
import db from "@/lib/db"; // conexão com o banco de dados
import bcrypt from "bcryptjs"; // biblioteca de criptografia de senhas (utiliza hash)
import { NextResponse } from "next/server";

export async function POST(req) {
  // Função assíncrona chamada POST, para enviar dados ao Banco de Dados
  // req é a requisição de cadastro feita pelo usuário a partir dos dados do próprio cadastro
  const { nome, email, cep, genero, senha } = await req.json();

  try {
    // primeiramente, tente isso
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const idConsumidor = uuidv4(); // Geração de ID único

    await db.query(
      "INSERT INTO tb_consumidores (id, nome, email, cep, genero, senha) VALUES ($1, $2, $3, $4, $5, $6)",
      [idConsumidor, nome, email, cep, genero, senhaCriptografada]
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
      "Erro ao adicionar novo usuário. Provavelmente a aplicação não está conectada ao Banco de Dados do sistema."
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

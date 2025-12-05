import db from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  try {
    const result = await db.query("SELECT * FROM produtos");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.log("Erro ao listar produtos", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    let { nome, sobre, valor, categoria, subcategoria, imagemUrl, estoque } =
      await req.json();

    // --------- VALIDAÇÕES ESSENCIAIS ---------

    if (!nome || typeof nome !== "string" || nome.trim().length === 0) {
      return NextResponse.json(
        { error: "O campo 'nome' é obrigatório e deve ser uma string válida." },
        { status: 400 }
      );
    }

    if (valor === undefined || valor === null) {
      return NextResponse.json(
        { error: "O campo 'valor' é obrigatório." },
        { status: 400 }
      );
    }

    const valorFormatado = String(valor).replace(",", ".");
    const valorNumero = Number(valorFormatado);

    if (isNaN(valorNumero)) {
      return NextResponse.json(
        { error: "O campo 'valor' deve ser numérico." },
        { status: 400 }
      );
    }

    // --------- DEFAULTS SEGUROS ---------

    if (!sobre || typeof sobre !== "string") {
      sobre = nome;
    }

    if (!categoria || typeof categoria !== "string") {
      categoria = "outros";
    }

    if (!subcategoria || typeof subcategoria !== "string") {
      subcategoria = "outros";
    }

    if (estoque === undefined || estoque === null || estoque === "") {
      estoque = 1;
    }

    const estoqueNumero = Number(estoque);
    if (isNaN(estoqueNumero)) {
      return NextResponse.json(
        { error: "O campo 'estoque' deve ser numérico." },
        { status: 400 }
      );
    }

    // --------- NORMALIZAÇÕES ---------

    let categoriaFormatada = categoria.toLowerCase().trim();

    if (
      categoriaFormatada.normalize("NFD").replace(/[\u0300-\u036f]/g, "") ===
      "cosmeticos"
    ) {
      categoriaFormatada = "cosmeticos";
    }

    const subcategoriaFormatada = subcategoria.toLowerCase().trim();

    // --------- INSERÇÃO NO BANCO ---------

    const id = uuidv4();

    await db.query(
      `
      INSERT INTO produtos 
        (id, nome, sobre, valor, categoria, subcategoria, imagem, estoque) 
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8)
      `,
      [
        id,
        nome.trim(),
        sobre.trim(),
        valorNumero,
        categoriaFormatada,
        subcategoriaFormatada,
        imagemUrl || null,
        estoqueNumero,
      ]
    );

    return NextResponse.json(
      { mensagem: "Produto adicionado com sucesso!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao adicionar produto:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}

import db from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    let conditions = [];
    let values = [];
    let index = 1;

    const categoria = searchParams.get("categoria");
    const subcategoria = searchParams.get("subcategoria");
    const filtros = searchParams.get("filtrar");
    const estoque = searchParams.get("estoque");

    let query;
    const colunasPermitidas = ["id", "nome", "valor", "imagem", "estoque"];

    if (filtros) {
      const colunas = filtros
        .replaceAll(" ", "")
        .split(",")
        .filter((c) => colunasPermitidas.includes(c))
        .map((c) => `p.${c}`)
        .join(", ");

      query = `SELECT ${colunas || "p.id"} FROM produtos p`;
    } else {
      query =
        "SELECT p.id, p.nome, p.valor, p.imagem, p.estoque FROM produtos p";
    }

    if (categoria) {
      conditions.push(`p.categoria = $${index++}`);
      values.push(categoria);
    }

    if (subcategoria) {
      conditions.push(`p.subcategoria = $${index++}`);
      values.push(subcategoria);
    }

    if (estoque) {
      if (estoque === "disponivel") {
        conditions.push(`p.estoque > 0`);
      }
      if (estoque === "indisponivel") {
        conditions.push(`p.estoque = 0`);
      }
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    const result = await db.query(query, values);
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
    let {
      nome,
      sobre,
      valor,
      categoria,
      subcategoria,
      imagemUrl,
      imagensUrl,
      estoque,
    } = await req.json();

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

    await Promise.all(
      imagensUrl.map((url) => {
        const idImagem = uuidv4();
        db.query(
          "INSERT INTO imagens_produto (id, id_produto, url) VALUES ($1, $2, $3)",
          [idImagem, id, url]
        );
      })
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

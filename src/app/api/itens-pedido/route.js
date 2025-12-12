import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST () {
    try {
        return NextResponse.json(result.rows);
    } catch (error) {
        console.log("Erro ao listar itens pedido", error);
    }
}
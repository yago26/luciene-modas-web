// list- Listar todos os arquivos no armazenamento Blob
// put- Carregar um arquivo para o armazenamento Blob
// del- Excluir um arquivo do armazenamento de Blobs
// copy- Copiar um arquivo no armazenamento de Blobs
// store add- Adicionar um novo armazenamento Blob
// store remove- Remover um repositório de Blobs
// store get- Obtenha uma loja Blob

import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  const blob = await put(file.name, file, {
    access: "public",
    addRandomSuffix: true /* Adicionar um sufixo aleatório (permite repetição de arquivos) */,
    // allowOverwrite: true, /* Sobrescrever/Substituir o blob com mesmo nome */
  });

  return NextResponse.json({ url: blob.url });
}

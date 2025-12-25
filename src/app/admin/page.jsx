import Link from "next/link";

export default function () {
  return (
    <>
      <h1>Painel de gerenciamento</h1>
      <h2>1. Criar novos produtos</h2>
      <p>
        <Link href="/admin/produtos">Criar novos produtos</Link>
      </p>
      <h2>2. Gerenciar pedidos</h2>
      <p>
        <Link href="/admin/produtos">Criar novos produtos</Link>
      </p>
      <h2>3. Painel de análise (dashboard)</h2>
      <p>
        <Link href="/admin/produtos">Criar novos produtos</Link>
      </p>
      <h2>4. Produtos esgotados</h2>
      <p>
        <Link href="/admin/produtos">Criar novos produtos</Link>
      </p>
    </>
  );
}

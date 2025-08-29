import Link from "next/link";

export default () => {
  return (
    <>
      <div>
        <h2>Gerenciamento</h2>
        <ol
          style={{
            marginLeft: "5%",
            display: "flex",
            gap: "5%",
          }}
        >
          {/* Consumidores */}
          <li>
            Consumidores
            <ul>
              <li>
                <Link href="/api/consumidores">Ver Consumidores</Link>
              </li>
              <li>
                <Link href="gerenciamento/consumidores">
                  Deletar Consumidores
                </Link>
              </li>
            </ul>
          </li>

          {/* Produtos */}
          <li>
            Produtos
            <ul>
              <li>
                <Link href="/api/produtos">Ver Produtos</Link>
              </li>
              <li>
                <Link href="gerenciamento/produtos">Gerenciar produtos</Link>
              </li>
              <li>
                <Link href="/">Ver Imagens dos Produtos</Link>
              </li>
              <li>
                <Link href="/">Ver Atributos dos produtos</Link>
              </li>
            </ul>
          </li>

          {/* Carrinho */}
          <li>
            Carrinhos
            <ul>
              <li>
                <Link href="/api/carrinhos">Ver Carrinhos</Link>
              </li>
              <li>
                <Link href="/api/itensCarrinho">Ver Itens dos Carrinhos</Link>
              </li>
              <li>
                <Link href="/">Ver Itens de um Carrinho Específico</Link>
              </li>
            </ul>
          </li>

          {/* Pedidos */}
          <li>
            Pedidos
            <ul>
              <li>
                <Link href="/">Ver Pedidos</Link>
              </li>
              <li>
                <Link href="/">Ver Itens dos Pedidos</Link>
              </li>
              <li>
                <Link href="/">Ver Itens de um Pedido Específico</Link>
              </li>
            </ul>
          </li>
        </ol>
      </div>
    </>
  );
};

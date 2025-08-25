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
            flexDirection: "column",
            gap: "10px",
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
            </ul>
          </li>
        </ol>
      </div>
    </>
  );
};

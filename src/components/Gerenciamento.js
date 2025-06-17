import Link from "next/link";

export default () => {
  return (
    <>
      <div>
        <h2>Gerenciamento</h2>
        <ul>
          <li>
            Consumidores
            <ol>
              <li>
                <Link href="/api/consumidores">Ver Consumidores</Link>
              </li>
              <li>
                <Link href="/consumidores">Deletar Consumidores</Link>
              </li>
            </ol>
          </li>
        </ul>
      </div>
    </>
  );
};

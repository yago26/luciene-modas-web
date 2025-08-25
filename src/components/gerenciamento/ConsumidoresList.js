export default function ConsumidoresList({ consumidores, onDeleteConsumidor }) {
  return (
    <>
      <table border="1px">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>CEP</th>
            <th>Gênero</th>
            <th>Senha</th>
          </tr>
        </thead>

        <tbody>
          {consumidores.map((consumidor) => (
            <tr key={consumidor.id}>
              <td>{consumidor.id}</td>
              <td>{consumidor.nome}</td>
              <td>{consumidor.email}</td>
              <td>{consumidor.cep}</td>
              <td>{consumidor.genero}</td>
              <td>{consumidor.senha}</td>
              <td>
                <button
                  style={{
                    backgroundColor: "transparent",
                    color: "#f00",
                    padding: "15px",
                    border: "none",
                  }}
                  onClick={() => onDeleteConsumidor(consumidor.id)}
                >
                  x
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

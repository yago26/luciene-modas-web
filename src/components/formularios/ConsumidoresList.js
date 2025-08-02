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
          {consumidores.map((usuario) => (
            <tr>
              <td>{usuario.id}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>{usuario.cep}</td>
              <td>{usuario.genero}</td>
              <td>{usuario.senha}</td>
              <td>
                <button
                  style={{
                    backgroundColor: "transparent",
                    color: "#f00",
                    padding: "15px",
                    border: "none",
                  }}
                  onClick={() => onDeleteConsumidor(usuario.id)}
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

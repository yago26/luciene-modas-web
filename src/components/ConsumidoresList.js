export default function ConsumidoresList({ consumidores, onDeleteConsumidor }) {
  return (
    <ul>
      {consumidores.map((consumidor) => (
        <li key={consumidor.id}>
          <span>
            Nome: {consumidor.nome}; Email: {consumidor.email}; CEP:{" "}
            {consumidor.cep}; Gênero: {consumidor.genero}; Senha:{" "}
            {consumidor.senha}
          </span>
          <button
            style={{ backgroundColor: "transparent", color: "#f00" }}
            onClick={() => onDeleteConsumidor(consumidor.id)}
          >
            x
          </button>
        </li>
      ))}
    </ul>
  );
}

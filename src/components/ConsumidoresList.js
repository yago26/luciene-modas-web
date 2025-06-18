export default function ConsumidoresList({ consumidores, onDeleteConsumidor }) {
  return (
    <div>
      {consumidores.map((consumidor) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1% 2%",
            width: "50%",
          }}
        >
          <span>
            <span style={{ fontWeight: "bold" }}>ID:</span> {consumidor.id};{" "}
            <span style={{ fontWeight: "bold" }}>Nome:</span> {consumidor.nome};{" "}
            <span style={{ fontWeight: "bold" }}>Email:</span>{" "}
            {consumidor.email}; <span style={{ fontWeight: "bold" }}>CEP:</span>{" "}
            {consumidor.cep};{" "}
            <span style={{ fontWeight: "bold" }}>Gênero:</span>{" "}
            {consumidor.genero};{" "}
            <span style={{ fontWeight: "bold" }}>Senha:</span>{" "}
            {consumidor.senha}
          </span>
          <button
            style={{ backgroundColor: "transparent", color: "#f00" }}
            onClick={() => onDeleteConsumidor(consumidor.id)}
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
}

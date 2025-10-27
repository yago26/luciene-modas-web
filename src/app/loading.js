// Substituir por Spin (tá em CardProduto)
import { Ring } from "react-css-spinners";

export default function Loading({ min_height = "70%" }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: min_height,
      }}
    >
      <Ring />
      <p>Loading...</p>
    </div>
  );
}

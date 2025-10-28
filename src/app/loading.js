// Substituir por Spin (tá em CardProduto)
import { Ring } from "react-css-spinners";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <Ring />
      <p>Loading...</p>
    </div>
  );
}

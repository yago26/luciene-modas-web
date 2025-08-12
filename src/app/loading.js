import { Ring } from "react-css-spinners";

export default function Loading() {
  return (
    <div
      style={{
        margin: "auto",
      }}
    >
      <Ring />
      <p>Loading...</p>
    </div>
  );
}

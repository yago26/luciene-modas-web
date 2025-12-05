import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function Loading() {
  return (
    <div style={style.container}>
      <Spin indicator={<LoadingOutlined style={style.loading} spin />} />
    </div>
  );
}

const style = {
  loading: {
    color: "var(--cor-principal)",
    height: "100%",
    fontSize: 48,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh",
    gap: "15px",
  },
};

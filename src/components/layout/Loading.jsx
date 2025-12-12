import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function Loading() {
  return (
    <div style={style.container}>
      <Spin
        style={style.loading}
        indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
      />
    </div>
  );
}

const style = {
  loading: {
    color: "var(--cor-principal)",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "50vh",
  },
};

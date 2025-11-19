import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
        gap: "15px",
      }}
    >
      <Spin
        indicator={
          <LoadingOutlined
            style={{ color: "white", height: "100%", fontSize: 64 }}
            spin
          />
        }
      />
      <p>Loading...</p>
    </div>
  );
}

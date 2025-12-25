import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function Loading() {
  return (
    <div className="overlay">
      <Spin
        indicator={
          <LoadingOutlined className="loading" style={{ fontSize: 48 }} spin />
        }
      />
    </div>
  );
}

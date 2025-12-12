import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import style from "./page.module.css";

export default function Loading() {
  return (
    <div className={style.overlay}>
      <Spin
        indicator={
          <LoadingOutlined
            className={style.loading}
            style={{ fontSize: 48 }}
            spin
          />
        }
      />
    </div>
  );
}

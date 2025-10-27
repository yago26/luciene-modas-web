import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default ({ onHandleAdd }) => {
  return (
    <>
      <button className={style.btnAdicionar} onClick={onHandleAdd}>
        {loading ? (
          <Spin
            indicator={
              <LoadingOutlined
                style={{ color: "white", height: "100%" }}
                spin
              />
            }
          />
        ) : (
          "Adicionar"
        )}
      </button>
    </>
  );
};

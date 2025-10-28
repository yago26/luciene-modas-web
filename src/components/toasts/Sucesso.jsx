import { Alert } from "antd";

export default ({ mensagem }) => {
    return (
        <>
        <Alert
          style={{ position: "fixed", bottom: 10, right: 10, zIndex: 10 }}
          message="Sucesso!"
          description={mensagem}
          type="success"
          showIcon
          closable
        />
        </>
    );
}
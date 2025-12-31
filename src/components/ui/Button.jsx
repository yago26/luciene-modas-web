"use client";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default ({
  variante,
  className = null,
  children,
  loading = false,
  handleClick,
  ...props
}) => {
  const [cor, tamanho = "normal", largura = "w-min"] = variante.split(" ");
  const variantes = {
    "w-100": {
      width: "100%",
    },
    "w-min": {
      width: "max-content",
    },
    cor: {
      backgroundColor: `var(--cor-${cor})`,
    },
    pequeno: {
      padding: "0.5rem",
      borderRadius: "0.75rem",
      borderBottom: `0.1rem solid var(--cor-complementar-${cor})`,
    },
    normal: {
      padding: "0.75rem",
      borderRadius: "1rem",
      borderBottom: `0.2rem solid var(--cor-complementar-${cor})`,
    },
    grande: {
      padding: "1rem",
      borderRadius: "1.25rem",
      borderBottom: `0.3rem solid var(--cor-complementar-${cor})`,
    },
  };
  return (
    <button
      {...props}
      className={className}
      style={{
        ...styles.button,
        ...variantes.cor,
        ...variantes[tamanho],
        ...variantes[largura],
      }}
      disabled={loading}
      onClick={() => handleClick?.()}
    >
      {loading ? (
        <Spin indicator={<LoadingOutlined style={styles.loading} spin />} />
      ) : (
        children
      )}
    </button>
  );
};

const styles = {
  loading: { color: "white", height: "100%" },
  button: {
    color: "white",
    border: "none",
  },
};

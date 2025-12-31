"use client";

import { signOut } from "next-auth/react";
import { Button, Modal } from "antd";
import { useState } from "react";
import style from "./outrasAcoesUsuario.module.css";
import { CircleX, LogOut } from "lucide-react";

export default ({ usuario }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const logout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const excluirConta = async () => {
    setConfirmLoading(true);
    await signOut({ redirect: true, callbackUrl: "/" });
    await fetch(
      `${process.env.NEXTAUTH_URL || ""}/api/usuarios/${usuario.id}`,
      {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      }
    );
    setConfirmLoading(false);
  };

  return (
    <>
      <div className={style.containerOutrasAcoes}>
        <Button
          type="primary"
          className={`${style.btn} ${style.btnExcluir}`}
          onClick={showModal}
        >
          <CircleX />
          Excluir
        </Button>
        <Modal
          title="Tem certeza que deseja excluir
              sua conta?"
          open={open}
          onOk={excluirConta}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          okText="Excluir"
          okType="danger"
          cancelText="Cancelar"
        >
          <p>
            Essa ação{" "}
            <span style={{ color: "red", fontWeight: "bold" }}>NÃO</span> poderá
            ser <span style={{ fontWeight: "bold" }}>desfeita</span>!
          </p>
        </Modal>
        <button className={`${style.btn} ${style.btnSair}`} onClick={logout}>
          <LogOut />
          Sair
        </button>
      </div>
    </>
  );
};

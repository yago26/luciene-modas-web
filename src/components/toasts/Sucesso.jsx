"use client";
import { Alert, Flex, Progress } from "antd";
import { useEffect, useState } from "react";
import style from "./style.module.css";

export default function Sucesso({ mensagem }) {
  const [showAlert, setShowAlert] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => prev + 3);
    }, 100);

    setTimeout(() => {
      clearInterval(timer);
      setShowAlert(false);
    }, 3000);
  }, []);

  if (!showAlert) return null;

  return (
    <Flex className={style.animados} vertical gap={0}>
      <Alert
        title="Sucesso!"
        description={mensagem}
        type="success"
        showIcon
        closable
      />
      <Progress
        percent={progress}
        size="small"
        showInfo={false}
        strokeColor="green"
        status="active"
      />
    </Flex>
  );
}

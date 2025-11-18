"use client";
import { Alert, Flex, Progress } from "antd";
import { useEffect, useState } from "react";

export default function Aviso({ mensagem }) {
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
  }, [mensagem]);

  if (!showAlert) return null;

  return (
    <Flex
      vertical
      style={{ position: "fixed", bottom: 10, right: 10, zIndex: 10 }}
      gap={0}
    >
      <Alert
        message="Aviso!"
        description={mensagem}
        type="warning"
        showIcon
        closable
      />
      <Progress
        percent={progress}
        size="small"
        showInfo={false}
        strokeColor="yellow"
        status="active"
      />
    </Flex>
  );
}

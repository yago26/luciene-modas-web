"use client";
import { Alert, Flex, Progress } from "antd";
import { useState, useEffect } from "react";

export default function Erro({ mensagem }) {
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
      <Alert message="Erro!" description={mensagem} type="error" showIcon />
      <Progress
        percent={progress}
        size="small"
        showInfo={false}
        strokeColor="red"
        status="active"
      />
    </Flex>
  );
}

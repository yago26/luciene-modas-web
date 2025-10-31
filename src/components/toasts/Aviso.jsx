"use client";
import { Alert, Flex, Progress } from "antd";
import { useEffect, useState } from "react";

export default function Aviso({ mensagem }) {
  const [progress, setProgress] = useState(0);
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    // Reinicia o alerta e o progresso sempre que a mensagem mudar
    setProgress(0);
    setShowAlert(true);

    const duration = 1500; // duração total em ms
    const intervalTime = 100; // frequência de atualização
    const steps = duration / intervalTime; // número de passos
    const increment = 100 / steps; // quanto somar por passo

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => setShowAlert(false), 200); // pequeno delay p/ suavidade
      } else {
        setProgress(currentProgress);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [mensagem]); // reinicia sempre que a mensagem mudar

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

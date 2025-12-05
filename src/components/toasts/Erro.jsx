"use client";
import { Alert, Flex, Progress } from "antd";
import { useState, useEffect } from "react";
import style from "./style.module.css";

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
  }, []);

  if (!showAlert) return null;

  return (
    <Flex className={style.animados} vertical gap={0}>
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

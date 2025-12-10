"use client";

import { useState, useEffect } from "react";
import { AutoComplete, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

export default function SearchBar({ produtos }) {
  const [valorPesquisa, setValorPesquisa] = useState("");
  const [options, setOptions] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (!valorPesquisa.trim()) {
      setOptions([]);
      return;
    }

    const filtrados = produtos
      .filter((produto) =>
        produto.nome.toLowerCase().includes(valorPesquisa.trim().toLowerCase())
      )
      .map((produto) => ({
        value: produto.nome,
        label: produto.nome,
        id: produto.id,
      }));

    setOptions(filtrados);
  }, [valorPesquisa]);

  const handleSelect = (_, option) => {
    router.push(`/produtos/${option.id}`);
  };

  const handleSubmit = () => {
    router.push(`/pesquisar?nome=${valorPesquisa}`);
  };

  return (
    <AutoComplete
      options={options}
      style={{ width: "100%", maxWidth: 450 }}
      onSelect={handleSelect}
      onSearch={(text) => setValorPesquisa(text)}
    >
      <Input
        size="large"
        placeholder="Buscar produtos"
        value={valorPesquisa}
        onChange={(e) => setValorPesquisa(e.target.value)}
        onPressEnter={handleSubmit}
        prefix={<SearchOutlined style={{ fontSize: 20, color: "#555" }} />}
        allowClear
      />
    </AutoComplete>
  );
}

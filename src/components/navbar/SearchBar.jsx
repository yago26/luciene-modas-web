"use client";

import { useState, useEffect } from "react";
import { AutoComplete, Input } from "antd";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import style from "./searchBar.module.css";

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
        id: produto.id,
        value: produto.nome,
        label: produto.nome,
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
      className={style.pesquisar}
      options={options}
      style={{ width: "100%", maxWidth: 450 }}
      onSelect={handleSelect}
      onSearch={(text) => setValorPesquisa(text)}
    >
      <Input
        className={style.pesquisar}
        size="large"
        placeholder="Buscar produtos"
        value={valorPesquisa}
        onChange={(e) => setValorPesquisa(e.target.value)}
        onPressEnter={handleSubmit}
        prefix={<Search className={style.icone} />}
        allowClear
      />
    </AutoComplete>
  );
}

"use client";

import { useRef, useState } from "react";
import style from "./page.module.css";

export default function produtosForm() {
  const [form, setForm] = useState({
    nome: "",
    sobre: "",
    valor: "",
    categoria: "",
    imagem: "",
    estoque: "",
  });

  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.imagem || !form.nome || !form.valor || !form.categoria) {
      return alert("Erro! Preencha os campos");
    }

    let imagemUrl = "";
    const formData = new FormData();
    // Formato próprio da web para enviar dados de formulário (textos e arquivos misturados)
    // * Lida bem com dados complexos, diferente do JSON.strigify()
    formData.append("file", form.imagem);

    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const { url } = await uploadRes.json();
    imagemUrl = url;

    const { nome, sobre, valor, categoria, estoque } = form;
    await fetch("/api/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome,
        sobre,
        valor,
        categoria,
        imagemUrl,
        estoque,
      }),
    });

    setForm({
      nome: "",
      sobre: "",
      valor: "",
      categoria: "",
      imagem: "",
      estoque: "",
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <>
      <h1>Gerenciamento de Produtos</h1>

      <h2>1. Adicionar Produtos</h2>
      <form onSubmit={handleSubmit} className={style.formAdicionarProdutos}>
        <label htmlFor="imagemProduto">Imagem</label>
        <input
          id="imagemProduto"
          type="file"
          ref={fileInputRef}
          onChange={(e) =>
            setForm({ ...form, imagem: e.target.files?.[0] || null })
          }
          required
        />

        <label htmlFor="nomeProduto">Nome</label>
        <input
          id="nomeProduto"
          placeholder="Nome do produto"
          type="text"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          required
        />

        <label htmlFor="valorProduto">Valor</label>
        <input
          id="valorProduto"
          placeholder="39.99"
          type="number"
          min="0"
          step="0.01"
          value={form.valor}
          onChange={(e) => setForm({ ...form, valor: e.target.value })}
          required
        />

        <label htmlFor="sobreProduto">Sobre (Opcional)</label>
        <input
          id="sobreProduto"
          placeholder="Descrição do produto"
          type="text"
          value={form.sobre}
          onChange={(e) => setForm({ ...form, sobre: e.target.value })}
        />

        <label htmlFor="estoqueProduto">Estoque (Opcional)</label>
        <input
          id="estoqueProduto"
          placeholder="Quantidade"
          type="number"
          step="1"
          min="0"
          value={form.estoque}
          onChange={(e) => setForm({ ...form, estoque: e.target.value })}
        />

        <p>Categoria</p>
        <label htmlFor="roupas">
          <input
            id="roupas"
            name="categoria-produto"
            type="radio"
            value="Roupas"
            checked={form.categoria === "Roupas"}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
          />
          Roupas
        </label>
        <label htmlFor="cosmeticos">
          <input
            id="cosmeticos"
            name="categoria-produto"
            type="radio"
            value="Cosmeticos"
            checked={form.categoria === "Cosmeticos"}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
          />
          Cosméticos
        </label>
        <label htmlFor="masculino">
          <input
            id="masculino"
            name="categoria-produto"
            type="radio"
            value="Masculino"
            checked={form.categoria === "Masculino"}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
          />
          Masculino
        </label>
        <label htmlFor="feminino">
          <input
            id="feminino"
            name="categoria-produto"
            type="radio"
            value="Feminino"
            checked={form.categoria === "Feminino"}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
          />
          Feminino
        </label>
        <label htmlFor="infantil">
          <input
            id="infantil"
            name="categoria-produto"
            type="radio"
            value="Infantil"
            checked={form.categoria === "Infantil"}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
          />
          Infantil
        </label>
        <label htmlFor="outros">
          <input
            id="outros"
            name="categoria-produto"
            type="radio"
            value="Outros"
            checked={form.categoria === "Outros"}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            required
          />
          Outros
        </label>

        <button type="submit">Adicionar Produto</button>
      </form>

      <h2>2. Remover Produtos</h2>

      <h2>3. Aplicar desconto</h2>
    </>
  );
}

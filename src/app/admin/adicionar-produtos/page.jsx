"use client";

import { useState } from "react";

import style from "./page.module.css";

export default () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    imagem: "",
    imagens: [],
    nome: "",
    sobre: "",
    valor: "",
    categoria: "",
    atributos: {
      nome: "",
      descricao: [],
      estoque: [],
    },
    subcategoria: "",
  });

  const handleAddImage = () => {
    setForm({
      ...form,
      imagens: [...form.imagens, null],
    });
  };

  const handleAddAttribute = () => {
    setForm({
      ...form,
      atributos: {
        ...form.atributos,
        estoque: form.atributos.estoque.map((v, idx) =>
          idx === 0 ? e.target.value : v
        ),
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const listaImagens = [form.imagem, ...form.imagens];

      const listaFormData = listaImagens.map((img) => {
        const fd = new FormData();
        fd.append("file", img);
        return fd;
      });

      const res = await Promise.all(
        listaFormData.map((imagem) =>
          fetch("/api/upload", {
            method: "POST",
            body: imagem,
          })
        )
      );

      const imagens = await Promise.all(
        res.map(async (r) => {
          const data = await r.json();
          return data.url;
        })
      );
      const imagem = imagens.shift();

      await fetch("/api/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          imagemUrl: imagem,
          imagensUrl: imagens,
        }),
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }

    setForm({
      imagem: "",
      imagens: [],
      nome: "",
      sobre: "",
      valor: "",
      categoria: "",
      atributos: {
        nome: "",
        descricao: [],
        estoque: [],
      },
      subcategoria: "",
    });
  };

  return (
    <>
      <h1>Criar novos produtos</h1>
      <form onSubmit={handleSubmit} className={style.form}>
        <input
          type="file"
          onChange={(e) => {
            const value = e.target.files[0];
            setForm({ ...form, imagem: value });
          }}
        />
        {form.imagens.map((img, i) => (
          <input
            key={`img-${i}`}
            type="file"
            onChange={(e) => {
              const novasImagens = [...form.imagens];
              novasImagens[i] = e.target.files[0];
              setForm({ ...form, imagens: novasImagens });
            }}
          />
        ))}
        <button type="button" onClick={handleAddImage}>
          +
        </button>
        <input
          type="text"
          value={form.nome}
          placeholder="Nome do produto"
          onChange={(e) => {
            const value = e.target.value;
            const regex = /^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]+$/;
            if (regex.test(value)) {
              setForm({ ...form, nome: value });
            }
          }}
        />
        <textarea
          value={form.sobre}
          placeholder="Descrição do produto "
          onChange={(e) => setForm({ ...form, sobre: e.target.value })}
        ></textarea>
        <label htmlFor="valor">
          Valor:
          <input
            id="valor"
            type="number"
            value={form.valor}
            placeholder="29,99"
            onChange={(e) => setForm({ ...form, valor: e.target.value })}
          />
        </label>
        Categoria
        <div>
          <label htmlFor="roupas">
            <input
              id="roupas"
              type="radio"
              name="categoria"
              value="roupas"
              onChange={(e) => {
                setForm({
                  ...form,
                  atributos: {
                    nome: "tamanho",
                    descricao: [null],
                    estoque: [null],
                  },
                  categoria: e.target.value,
                });
              }}
              checked={form.categoria === "roupas"}
            />
            Roupas
          </label>
          <label htmlFor="cosmeticos">
            <input
              id="cosmeticos"
              type="radio"
              name="categoria"
              value="cosmeticos"
              onChange={(e) => {
                setForm({
                  ...form,
                  atributos: {
                    nome: "volume",
                    descricao: [null],
                    estoque: [null],
                  },
                  categoria: e.target.value,
                });
              }}
              checked={form.categoria === "cosmeticos"}
            />
            Cosméticos
          </label>
          <label htmlFor="outros">
            <input
              id="outros"
              type="radio"
              name="categoria"
              value="outros"
              onChange={(e) =>
                setForm({
                  ...form,
                  atributos: {
                    nome: "outros",
                    descricao: [null],
                    estoque: [null],
                  },
                  categoria: e.target.value,
                })
              }
              checked={form.categoria === "outros"}
            />
            Outros
          </label>
        </div>
        {form.atributos.nome == "tamanho"
          ? form.atributos.descricao.map((attribute, i) => (
              <div key={`attribute-${i}`}>
                <label htmlFor="tamanho">Tamanho:</label>
                <select id="tamanho">
                  <option value="">Selecione uma opção</option>
                  <option value="PP">PP</option>
                  <option value="P">P</option>
                  <option value="M">M</option>
                  <option value="G">G</option>
                  <option value="GG">GG</option>
                  <option value="XG">XG</option>
                  <option value="XGG">XGG</option>
                  <option value="EG">EG</option>
                  <option value="EGG">EGG</option>
                </select>
                <label htmlFor="estoque">
                  Estoque:
                  <input
                    id="estoque"
                    type="number"
                    value={form.atributos.estoque[0] || ""}
                    placeholder="1"
                    onChange={(e) => {
                      const novosAtributos = form.atributos;
                      novosAtributos.estoque[0] = e.target.value;
                      setForm({ ...form, atributos: novosAtributos });
                    }}
                    step={1}
                  />
                </label>
              </div>
            ))
          : form.atributos.nome == "volume"
          ? form.atributos.descricao.map((attribute, i) => (
              <div key={`attribute-${i}`}>
                <div>
                  <label htmlFor="volume">
                    Volume:
                    <input
                      id="volume"
                      type="number"
                      value={form.atributos.descricao[i] || ""}
                      placeholder="500"
                      onChange={(e) => {
                        const novosAtributos = form.atributos;
                        novosAtributos.descricao[i] = e.target.value;
                        setForm({ ...form, atributos: novosAtributos });
                      }}
                      step={1}
                    />
                    <label htmlFor="volume">Medida:</label>
                    <select id="volume">
                      <option value="">Selecione uma opção</option>
                      <option value="mL">mL</option>
                      <option value="L">L</option>
                    </select>
                  </label>
                </div>
                <label htmlFor="estoque">
                  Estoque:
                  <input
                    id="estoque"
                    type="number"
                    value={form.atributos.estoque[0] || ""}
                    placeholder="1"
                    onChange={(e) => {
                      const novosAtributos = form.atributos;
                      novosAtributos.estoque[0] = e.target.value;
                      setForm({ ...form, atributos: novosAtributos });
                    }}
                    step={1}
                  />
                </label>
              </div>
            ))
          : form.atributos.nome && <input value={"Outro"} type="text" />}
        <button type="button" onClick={handleAddAttribute}>
          +
        </button>
        Subcategoria
        <div>
          <label htmlFor="masculino">
            <input
              id="masculino"
              value="masculino"
              type="radio"
              name="subcategoria"
              onChange={(e) =>
                setForm({ ...form, subcategoria: e.target.value })
              }
              checked={form.subcategoria === "masculino"}
            />
            Masculino
          </label>
          <label htmlFor="feminino">
            <input
              id="feminino"
              value="feminino"
              type="radio"
              name="subcategoria"
              onChange={(e) =>
                setForm({ ...form, subcategoria: e.target.value })
              }
              checked={form.subcategoria === "feminino"}
            />
            Feminino
          </label>
          <label htmlFor="infantil">
            <input
              id="infantil"
              value="infantil"
              type="radio"
              name="subcategoria"
              onChange={(e) =>
                setForm({ ...form, subcategoria: e.target.value })
              }
              checked={form.subcategoria === "infantil"}
            />
            Infantil
          </label>
          <label htmlFor="sub-outros">
            <input
              id="sub-outros"
              value="outros"
              type="radio"
              name="subcategoria"
              onChange={(e) =>
                setForm({ ...form, subcategoria: e.target.value })
              }
              checked={form.subcategoria === "outros"}
            />
            Outros
          </label>
        </div>
        <button type="submit">
          {loading ? "...Loading" : "Adicionar produto"}
        </button>
      </form>
    </>
  );
};

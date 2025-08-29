"use client";

import style from "./searchBar.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar({ produtos }) {
  const [valorPesquisa, setValorPesquisa] = useState("");
  const [produtosFiltrados, setProdutosFiltrados] = useState(
    produtos
  );
  const [isInputFocus, setIsInputFocus] = useState(false);

  useEffect(() => {
    // Utilizado quando queremos renderizar as telas novamente com base em algum estado de uma variável
    if (valorPesquisa === "") {
      setProdutosFiltrados(produtos);
      return;
    }

    const filtrados = produtos.filter((produto) =>
      produto.nome.toLowerCase().includes(valorPesquisa.trim().toLowerCase())
    );
    setProdutosFiltrados(filtrados);
  }, [valorPesquisa]);

  const router = useRouter();

  const handleSumit = (e) => {
    if (e) e.preventDefault();
    router.push(`/searchPage`);
  };

  return (
    <>
      <form onSubmit={handleSumit} className={style.contentSearchBar}>
        <div className={style.searchBar}>
          <div className={style.lupaPesquisa}>
            <Search size={24} />
          </div>

          <input
            className={style.inputPesquisa}
            type="search"
            name="input-pesquisa"
            id="inputPesquisa"
            placeholder="Buscar produtos"
            autoComplete="off"
            value={valorPesquisa} // ← Adicionado
            onFocus={() => setIsInputFocus(true)}
            onBlur={() => setIsInputFocus(false)}
            onChange={(e) => setValorPesquisa(e.target.value)}
          />
        </div>
        <div
          className={`${style.options} ${
            isInputFocus ? style.showOptions : style.hiddenOptions
          }`}
        >
          {produtosFiltrados.map((produto) => (
            <button
              key={produto.id}
              value={produto.nome}
              onMouseDown={() => {
                router.push(`/productPage/${produto.id}`);
              }}
            >
              {produto.nome}
            </button>
          ))}
        </div>
      </form>
    </>
  );
}

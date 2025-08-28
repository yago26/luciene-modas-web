"use client";

import style from "./searchBar.module.css";
import { fakeProducts } from "@/lib/fakeDataBase";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [valorPesquisa, setValorPesquisa] = useState("");
  const [produtosFiltrados, setProdutosFiltrados] = useState(
    fakeProducts.slice(0, 15)
  );
  const [isInputFocus, setIsInputFocus] = useState(false);

  useEffect(() => {
    // Utilizado quando queremos renderizar as telas novamente com base em algum estado de uma variável
    if (valorPesquisa === "") {
      setProdutosFiltrados(fakeProducts.slice(0, 15));
      return;
    }

    const filtrados = fakeProducts.filter((product) =>
      product.nome.toLowerCase().includes(valorPesquisa.trim().toLowerCase())
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

      {/* <form className={style.barraPesquisa} action="">
        <div className={style.divPesquisa}>
          <div className={style.lupaPesquisa}>
            <Image
              src="/icons/magnifying-glass-solid.svg"
              alt="Lupa de pesquisa"
              width={16}
              height={16}
            />
          </div>

          <input
            className={style.inputPesquisa}
            type="search"
            name="input-pesquisa"
            id="inputPesquisa"
            placeholder="Buscar produtos"
            list="lista-produtos"
            autoComplete="off"
            onChange={(e) =>
              setValorPesquisa(e.target.value.trim().toLowerCase())
            }
          />

          <datalist id="lista-produtos">
            {produtosFiltrados.map((produto) => (
              <option key={produto.id} value={produto.nome}>
                {produto.nome}
              </option>
            ))}
          </datalist>
        </div>
      </form> */}
    </>
  );
}

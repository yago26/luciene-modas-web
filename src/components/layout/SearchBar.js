"use client";

import style from "./searchBar.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar({ produtos }) {
  const [valorPesquisa, setValorPesquisa] = useState("");
  const [produtosFiltrados, setProdutosFiltrados] = useState(produtos);
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

// import React, { useState } from 'react';
// import { AutoComplete, Input } from 'antd';
// const getRandomInt = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;
// const searchResult = query =>
//   Array.from({ length: getRandomInt(5) })
//     .join('.')
//     .split('.')
//     .map((_, idx) => {
//       const category = `${query}${idx}`;
//       return {
//         value: category,
//         label: (
//           <div
//             style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//             }}
//           >
//             <span>
//               Found {query} on{' '}
//               <a
//                 href={`https://s.taobao.com/search?q=${query}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {category}
//               </a>
//             </span>
//             <span>{getRandomInt(200, 100)} results</span>
//           </div>
//         ),
//       };
//     });
// const App = () => {
//   const [options, setOptions] = useState([]);
//   const handleSearch = value => {
//     setOptions(value ? searchResult(value) : []);
//   };
//   const onSelect = value => {
//     console.log('onSelect', value);
//   };
//   return (
//     <AutoComplete
//       popupMatchSelectWidth={252}
//       style={{ width: 300 }}
//       options={options}
//       onSelect={onSelect}
//       onSearch={handleSearch}
//     >
//       <Input.Search size="large" placeholder="input here" enterButton />
//     </AutoComplete>
//   );
// };
// export default App;

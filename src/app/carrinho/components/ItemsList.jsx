"use client";

import Loading from "../../../components/layout/Loading";
import NotFound from "../../../components/layout/NotFound";
import ItemCarrinho from "./Item";

import style from "./itemsList.module.css";

export default function ItensList({
  loading,
  selecionados,
  itens,
  selecionarItem,
  removerItemSelecionado,
}) {
  return (
    <div className={style.itens}>
      {loading ? (
        <Loading />
      ) : itens.length == 0 ? (
        <NotFound
          titulo="Carrinho vazio!"
          mensagem="Seu carrinho está vazio no momento, adicione produtos para continuar."
        />
      ) : (
        itens.map((item) => (
          <div
            key={item.id}
            className={
              selecionados.has(item.id)
                ? style.selecionado
                : style.naoSelecionado
            }
          >
            <ItemCarrinho
              item={item}
              selecionados={selecionados}
              onSelecionarItem={() => selecionarItem(item.id)}
              onRemoverItemSelecionado={() => removerItemSelecionado(item.id)}
            />
          </div>
        ))
      )}
    </div>
  );
}

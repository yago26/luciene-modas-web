import { CheckCheck, Minus, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";

import style from "./funcionalidades.module.css";

export default ({
  itens,
  selecionados,
  loadingRemoveSelectionAll,
  handleRemoveSelectionAll,
  handleSelectAll,
  handleRemoveAll,
}) => (
  <div className={style.container}>
    <Button
      variante="terciaria normal"
      className={
        itens.length === selecionados.size
          ? style.removerSelecaoTodos
          : style.selecionarTodos
      }
      handleClick={
        itens.length === selecionados.size
          ? handleRemoveSelectionAll
          : handleSelectAll
      }
    >
      {itens.length === selecionados.size ? <Minus /> : <CheckCheck />}
      {itens.length === selecionados.size
        ? "Remover todos"
        : "Selecionar todos"}
    </Button>

    <Button
      variante="terciaria normal"
      loading={loadingRemoveSelectionAll}
      handleClick={handleRemoveAll}
    >
      <Trash2 />
    </Button>
  </div>
);

import style from "./comentario.module.css";

import { Rate } from "antd";
import { formatDate } from "@/utils/dataFormatation";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { ChevronDown, CornerDownRight } from "lucide-react";

export default ({ comentario, idUsuario }) => {
  const { conteudo, avaliacao_produto, data_criacao } = comentario;
  const usuario = comentario.usuario[0];

  return (
    <div className={style.container}>
      <div className={style.identificador}>
        <img
          className={style.imagemUsuario}
          src={usuario.imagem}
          alt="Foto de perfil"
        />
        <div>
          <p className={style.nome}>{usuario.nome}</p>
          <p className={style.username}>
            @{usuario.username ?? "Nome de usuário"}
          </p>
        </div>
      </div>

      <div className={style.comentario}>
        <div className={style.dados}>
          <Rate
            className={style.avaliacao}
            defaultValue={Number(avaliacao_produto)}
            allowHalf
            disabled
          />

          <p className={style.conteudo}>{conteudo}</p>

          <p>{formatDate(data_criacao, false)}</p>
        </div>

        <div className={style.funcionalidades}>
          <Button variante="terciaria pequeno w-min">
            <ChevronDown className={style.icone} />
            Mostrar respostas
          </Button>
          {idUsuario && (
            <Button variante="principal pequeno w-min">
              <CornerDownRight className={style.icone} />
              Responder
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

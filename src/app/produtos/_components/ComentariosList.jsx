"use client";

import { useEffect, useState } from "react";

import style from "./comentariosList.module.css";

import Container from "@/components/ui/Container";
import Loading from "@/components/layout/Loading";
import Button from "@/components/ui/Button";
import { Rate } from "antd";
import Comentario from "./Comentario";

export default ({ usuario, id_produto }) => {
  const [loading, setLoading] = useState({
    comentarios: true,
    criar: false,
  });
  const [comentarios, setComentarios] = useState([]);
  const [form, setForm] = useState({
    conteudo: "",
    avaliacao_produto: 0.5,
  });

  useEffect(() => {
    getComentarios();
  }, []);

  async function getComentarios() {
    try {
      setLoading({ ...loading, comentarios: true });
      const res = await fetch(`/api/comentarios?id_produto=${id_produto}`);
      const data = await res.json();
      setComentarios(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading({ ...loading, comentarios: false });
    }
  }

  const criar = async (form) => {
    try {
      setLoading({ ...loading, criar: true });

      const response = await fetch("/api/comentarios", {
        method: "POST",
        body: JSON.stringify({ ...form, idProduto: id_produto }),
      });

      if (response.ok) {
        await getComentarios();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading({ ...loading, criar: false });
    }
  };

  const atualizar = async (form) => {
    await fetch(`/api/comentarios/${id_produto}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
  };

  const excluir = async () => {
    await fetch(`/api/comentarios/${id_produto}`, {
      method: "DELETE",
    });
  };

  return (
    <Container>
      <h1>Comentários</h1>
      {usuario && (
        <form>
          <div className={style.container}>
            <div className={style.identicador}>
              <img
                className={style.imagemUsuario}
                src={usuario.imagem}
                alt="Foto de perfil"
              />
              <div>
                <p>{usuario.nome}</p>
                <p className={style.username}>
                  @{usuario.username ?? "Nome de usuário"}
                </p>
              </div>
            </div>

            <div className={style.dadosComentario}>
              <Rate
                className={style.avaliacao}
                value={form.avaliacao_produto}
                onChange={(value) =>
                  setForm({ ...form, avaliacao_produto: value })
                }
                defaultValue={0.5}
                allowHalf
              />

              <textarea
                value={form.conteudo}
                placeholder="Adicione um comentário..."
                onChange={(e) => setForm({ ...form, conteudo: e.target.value })}
                autoComplete="off"
                rows={1}
              ></textarea>
            </div>
          </div>

          <div className={style.funcionalidades}>
            <Button
              type="button"
              variante="principal normal w-min"
              loading={loading.criar}
              handleClick={() => criar(form)}
            >
              Comentar
            </Button>
          </div>
        </form>
      )}
      {loading.comentarios ? (
        <Loading />
      ) : (
        <Container>
          {comentarios?.length == 0 && <p>Seja o primeiro a comentar!</p>}

          {comentarios?.map((comentario) => (
            <Comentario
              key={comentario.id}
              comentario={comentario}
              idUsuario={usuario?.id ?? null}
            />
          ))}
        </Container>
      )}
    </Container>
  );
};

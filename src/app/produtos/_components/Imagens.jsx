"use client";
import { Image } from "antd";
import style from "./imagensProduto.module.css";

export default function ImagensProduto({ produto }) {
  const { nome, sobre, imagem, imagens } = produto;
  return (
    <>
      <div className={style.container}>
        <Image.PreviewGroup
          preview={{
            onChange: (current, prev) =>
              console.log(`current index: ${current}, prev index: ${prev}`),
          }}
        >
          <Image
            src={imagem}
            alt={sobre ? sobre : nome}
            width={400}
            className={style.img}
          />
          <div className={style.containerImagens}>
            {imagens &&
              imagens.map((imagem) => (
                <Image
                  key={imagem.id}
                  src={imagem.url}
                  alt={sobre ? sobre : nome}
                  width={150}
                  className={style.img}
                />
              ))}
          </div>
        </Image.PreviewGroup>
      </div>
    </>
  );
}

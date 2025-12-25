import getUsuarioServerSide from "@/lib/getUsuarioServerSide";
import FuncionalidadesProduto from "../FuncionalidadesProduto";
import { Divider } from "antd";

import style from "./page.module.css";
import ImagensProduto from "../ImagensProduto";
import NotFound from "@/app/not-found";

export default async function ProductPage({ params }) {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/produtos/${id}`
  );

  if (!response.ok) {
    return <NotFound />;
  }

  const produto = await response.json();

  const usuario = await getUsuarioServerSide();

  const { nome, sobre, valor, imagem, imagens, estoque } = produto;

  const propsImagensProduto = {
    nome: nome,
    sobre: sobre,
    imagem: imagem,
    imagens: imagens,
  };

  const propsFuncionalidadesProduto = {
    id: id,
    nome: nome,
    valor: valor,
    estoque: estoque,
  };

  return (
    <>
      <div className={style.container}>
        <ImagensProduto produto={propsImagensProduto} />
        <div className={style.infosProduto}>
          <h1 style={{ fontWeight: "bold" }}>{nome}</h1>
          <Divider style={{ borderColor: "black" }} />
          <h2>Descrição</h2>
          <p>{sobre ? sobre : nome}</p>
          <FuncionalidadesProduto
            produto={propsFuncionalidadesProduto}
            usuario={usuario}
          />
        </div>
      </div>
    </>
  );
}

import getUsuarioServerSide from "@/utils/getUsuarioServerSide";
import Funcionalidades from "../components/Funcionalidades";

import style from "./page.module.css";
import Imagens from "../components/Imagens";
import NotFound from "@/app/not-found";
import Divider from "@/components/ui/Divider";
import Comentarios from "../components/Comentarios";

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

  const propsImagens = {
    nome: nome,
    sobre: sobre,
    imagem: imagem,
    imagens: imagens,
  };

  const propsFuncionalidades = {
    id: id,
    nome: nome,
    valor: valor,
    estoque: estoque,
  };

  return (
    <>
      <div className={style.container}>
        <Imagens produto={propsImagens} />
        <div className={style.infosProduto}>
          <h1 style={{ fontWeight: "bold" }}>{nome}</h1>
          <Divider />
          <h2>Descrição</h2>
          <p>{sobre ? sobre : nome}</p>
          <Funcionalidades produto={propsFuncionalidades} usuario={usuario} />
        </div>
      </div>

      <div>
        <Comentarios usuario={usuario} />
      </div>
    </>
  );
}

import getUsuarioServerSide from "@/lib/getUsuarioServerSide";
import InfoProduto from "@/components/produtos/InfoProduto";
import style from "./page.module.css";

export default async function ProductPage({ params }) {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/produtos/${id}`
  );
  const produto = await response.json();

  const usuario = await getUsuarioServerSide();

  return (
    <>
      <div className={style.containerInfosProduto}>
        <div className={style.imagensProduto}>
          {/* <div>Imagens laterais</div> */}
          <img
            src={produto.imagem}
            alt={!produto.sobre ? produto.nome : produto.sobre}
            width={400}
            height={400}
            style={{ objectFit: "cover" }}
          />
        </div>
        <InfoProduto produto={produto} usuario={usuario} />
      </div>
    </>
  );
}

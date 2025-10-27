import ProductPageInfoProduct from "@/components/produtos/ProductPageInfoProduct";
import style from "@/components/produtos/productPageMain.module.css";
import getConsumidorServerSide from "@/lib/getConsumidorServerSide";

export default async function ProductPageMain({ produto }) {
  const consumidor = await getConsumidorServerSide();

  return (
    <>
      <div className={style.containerInfosProduto}>
        <div className={style.imagensProduto}>
          <div>Imagens laterais</div>
          <img
            src={produto.imagem}
            alt={!produto.sobre ? produto.nome : produto.sobre}
            width={400}
            height={400}
            style={{ objectFit: "cover" }}
          />
        </div>
        <ProductPageInfoProduct produto={produto} consumidor={consumidor} />
      </div>
    </>
  );
}

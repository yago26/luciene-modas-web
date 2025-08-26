import { cookies } from "next/headers";
import { verificarToken } from "@/lib/auth";

import ProductPageInfoProduct from "@/components/produtos/ProductPageInfoProduct";
import style from "@/components/produtos/productPageMain.module.css";

export default async function ProductPageMain({ produto }) {
  const cookie = (await cookies())?.toString();
  const usuario = cookie ? verificarToken(cookie) : null;

  return (
    <>
      <div className={style.containerInfosProduto}>
        <div className={style.imagensProduto}>
          <div>Imagens laterais</div>
          <img
            src={produto.imagem}
            alt={!produto.sobre ? produto.nome : produto.sobre}
            width={320}
            height={320}
            style={{ objectFit: "cover" }}
          />
        </div>
        <ProductPageInfoProduct produto={produto} usuario={usuario} />
      </div>
    </>
  );
}

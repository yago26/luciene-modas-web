import ProductPageMain from "@/components/produtos/ProductPageMain";
import style from "./page.module.css";

export default async function ProductPage({ params }) {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/produtos/${id}`
  );
  const produto = await response.json();

  return (
    <>
      <ProductPageMain produto={produto} />
      <h2>Produtos relacionados</h2>
    </>
  );
}

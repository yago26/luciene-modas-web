import { useRouter } from "next/navigation";
import style from "./resumoCompra.module.css";
import Button from "@/components/ui/Button";

export default ({ selecionados, selecionadosArray, subtotal }) => {
  const router = useRouter();

  return (
    <div className={style.container}>
      <header className={style.titulo}>
        <h2>Resumo da Compra</h2>
      </header>

      <div className={style.subcontainer}>
        <div className={style.itens}>
          {!(selecionadosArray.length > 0) ? (
            <p style={{ color: "gray" }}>
              Selecione produtos para realizar a compra.
            </p>
          ) : (
            <div style={{ marginBottom: "20px" }}>
              {selecionadosArray.map((p) => (
                <div key={p.id} className={style.item}>
                  <span>
                    {p.nome} <br /> ({p.quantidade} × R${" "}
                    {Number(p.valor).toFixed(2).replace(".", ",")})
                  </span>

                  <strong>
                    R${" "}
                    {(p.quantidade * Number(p.valor))
                      .toFixed(2)
                      .replace(".", ",")}
                  </strong>
                </div>
              ))}
            </div>
          )}

          <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            Subtotal:{" "}
            <span style={{ color: "green" }}>
              R$ {subtotal.toFixed(2).replace(".", ",")}
            </span>
          </p>
        </div>

        <div className={style.realizarCompra}>
          {selecionados.size > 0 && (
            <Button
              variante="terciaria grande w-100"
              handleClick={() => {
                const ids = Array.from(selecionados);
                router.push(`/checkout?ids=${ids}`);
              }}
            >
              Realizar compra
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

import { signIn } from "next-auth/react";

export default () => {
  const tamanho = 30;

  return (
    <>
      <div style={style.containerProvedores}>
        <button
          onClick={() => signIn("google", { redirect: true, callbackUrl: "/" })}
          style={style.btn}
        >
          <img
            src="/icones/google.svg"
            alt="Logo do Google"
            width={tamanho}
            height={tamanho}
          />
        </button>

        <button onClick={() => alert("Função indisponível.")} style={style.btn}>
          <img
            src="/icones/instagram.svg"
            alt="Logo do Instagram"
            width={tamanho}
            height={tamanho}
          />
        </button>

        <button onClick={() => alert("Função indisponível.")} style={style.btn}>
          <img
            src="/icones/facebook.svg"
            alt="Logo do Google"
            width={tamanho}
            height={tamanho}
          />
        </button>
      </div>
    </>
  );
};

const style = {
  containerProvedores: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5%",
    marginBlock: "15px",
  },
  btn: {
    border: "none",
    backgroundColor: "transparent",
    boxShadow: "1px 1px 10px gray",
    borderRadius: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
};

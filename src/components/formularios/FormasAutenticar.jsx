import { signIn } from "next-auth/react";

export default () => {
  const tamanho = 30;

  return (
    <>
      <div style={style.containerProvedores}>
        <button onClick={() => signIn("google")} style={style.btn}>
          <img
            src="/icones/google.svg"
            alt="Logo do Google"
            width={tamanho}
            height={tamanho}
          />
          Entrar com Google
        </button>

        <button onClick={() => signIn("google")} style={style.btn}>
          <img
            src="/icones/instagram.svg"
            alt="Logo do Instagram"
            width={tamanho}
            height={tamanho}
          />
          Entrar com Instagram
        </button>

        <button onClick={() => signIn("google")} style={style.btn}>
          <img
            src="/icones/facebook.svg"
            alt="Logo do Google"
            width={tamanho}
            height={tamanho}
          />
          Entrar com Facebook
        </button>
      </div>
    </>
  );
};

const style = {
  containerProvedores: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "5%",
  },
  btn: {
    backgroundColor: "white",
    border: "none",
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px",
    margin: "5px",
    gap: "15px",
  },
};

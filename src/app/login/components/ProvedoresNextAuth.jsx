import { signIn } from "next-auth/react";

export default () => {
  return (
    <>
      <div style={style.containerProvedores}>
        <button
          onClick={() => signIn("google", { redirect: true, callbackUrl: "/" })}
          style={style.btn}
        >
          <img
            style={style.icone}
            src="/icones/google.svg"
            alt="Logo do Google"
          />
          Continue com Google
        </button>

        <button onClick={() => alert("Função indisponível.")} style={style.btn}>
          <img
            style={style.icone}
            src="/icones/instagram.svg"
            alt="Logo do Instagram"
          />
          Continue com Instagram
        </button>

        <button onClick={() => alert("Função indisponível.")} style={style.btn}>
          <img
            style={style.icone}
            src="/icones/facebook.svg"
            alt="Logo do Google"
          />
          Continue com Facebook
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
    gap: "10px",
  },
  btn: {
    border: "1px solid gray",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    width: "100%",
  },
  icone: {
    width: "30px",
  },
};

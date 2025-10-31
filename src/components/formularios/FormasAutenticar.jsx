import { signIn } from "next-auth/react";

export default () => {
  const tamanho = 30;
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "5%",
        }}
      >
        <button
          onClick={() => signIn("google")}
          style={{
            backgroundColor: "white",
            border: "1px black solid",
            borderRadius: "100%",
            padding: "5px",
          }}
        >
          <img
            src="/icones/google.svg"
            alt="Logo do Google"
            width={tamanho}
            height={tamanho}
          />
        </button>

        <button
          onClick={() => signIn("google")}
          style={{
            backgroundColor: "white",
            border: "1px black solid",
            borderRadius: "100%",
            padding: "5px",
          }}
        >
          <img
            src="/icones/google.svg"
            alt="Logo do Google"
            width={tamanho}
            height={tamanho}
          />
        </button>

        <button
          onClick={() => signIn("google")}
          style={{
            backgroundColor: "white",
            border: "1px black solid",
            borderRadius: "100%",
            padding: "5px",
          }}
        >
          <img
            src="/icones/google.svg"
            alt="Logo do Google"
            width={tamanho}
            height={tamanho}
          />
        </button>
      </div>
    </>
  );
};

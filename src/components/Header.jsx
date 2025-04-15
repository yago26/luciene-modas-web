import style from "./header.module.css";

export function Header() {
  return (
    <header className={style.header}>
      <h1>Luciene Modas</h1>
      <nav>
        <ul className={style.ul}>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Products</a>
          </li>
          <li>
            {/* <div>
              <button
                className={style.button}
                style={{
                  backgroundColor: "var(--cor-texto)",
                  color: "white",
                  border: "none",
                  borderRadius: 2,
                }}
              >
                Aulas
              </button>
            </div> */}
          </li>
        </ul>
      </nav>
      <ul className={style.ul}>
        <li>
          <button className={style.button} style={{ background: "none" }}>
            Sign In
          </button>
        </li>
        <li>
          <button
            className={style.button}
            style={{
              background: "var(--cor-texto)",
              color: "white",
              border: "none",
            }}
          >
            Sign Up
          </button>
        </li>
      </ul>
    </header>
  );
}

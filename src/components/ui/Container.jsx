export default ({ variante, titulo, className = null, children, ...props }) => {
  return (
    <div {...props} className={className} style={styles.container}>
      {children}
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    borderRadius: "2rem",
    backgroundColor: "var(--cor-complementar-secundaria)",
  },
};

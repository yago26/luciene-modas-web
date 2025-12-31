export default ({ variante, titulo, children, ...props }) => {
  return (
    <div {...props} style={styles.container}>
      children
    </div>
  );
};

const styles = {
  container: {},
};

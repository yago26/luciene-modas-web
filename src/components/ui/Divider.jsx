"use client";

export default ({
  color = "lightgray",
  className = "",
  children = null,
  ...props
}) => {
  return (
    <>
      {children ? (
        <div style={styles.container}>
          <hr
            {...props}
            className={className}
            style={{ ...styles.hr, borderColor: color }}
          />
          <span>{children}</span>
          <hr
            {...props}
            className={className}
            style={{ ...styles.hr, borderColor: color }}
          />
        </div>
      ) : (
        <hr
          {...props}
          className={className}
          style={{ ...styles.hr, borderColor: color }}
        />
      )}
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
  },
  hr: {
    width: "100%",
  },
};

import { CSSProperties } from "react";
import { FadeLoader } from "react-spinners";

const Loader = () => {
  const override: CSSProperties = {
    display: "block",
    borderColor: "blue",
    position: "absolute",
    zIndex: 100,
    top: "50%",
    left: 0,
    right: 0,
    bottom: 0,
    margin: "0 auto",
  };
  return (
    <FadeLoader
      color={"#000"}
      loading
      cssOverride={override}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loader;
